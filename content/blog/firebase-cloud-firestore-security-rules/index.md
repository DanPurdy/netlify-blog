---
path: firebase-cloud-firestore-security-rules-part-one
date: 2020-12-16T23:08:41.817Z
title: Firebase Cloud Firestore security rules - Part one - Writing the rules
description: An introduction to Cloud Firestore security rules and how to unit
  test them to help secure your firebase application
---
## What is Firebase Cloud Firestore?

Briefly... 

> Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - at global scale.

What that means in layman's terms that we can easily digest is it's a really simple way for you to get setup with a cloud based NoSQL database and focus on building your application rather than worry about all the overhead of setting up a database and getting into all the devops work. Firebase Cloud Firestore includes a pretty generous free tier where the cost scales seemingly well as you move to that 'global scale' mentioned above.
Firestore is not to be confused with the familiar Firebase offering of Realtime Database that they've been famous for and which ultimately led to their takeover by Google back in 2014, since that time Firebase have diversified into many areas similar to Jamstack providers like Netlify etc by offering hosted server-less functions, hosting, authentication tooling all powered through the GCP platform but without all the Kubernetes orchestration or whatever else you dream up.

So Firestore is a cloud based NoSQL database that holds data and as with any data we keep or expose in some way to the internet we need to ensure it's secure and make sure only our application and those we deem trustworthy can access it in ways we expect and define.

Firestore comes with security rules, we can write these rules to give granular control to how certain documents/collections can be read and/or updated within our database and when we use the authentication tooling provided by Firebase in our app we can allow role based access and permissions with very little effort.

I want to focus on the rules and how you can write tests against these in this post and the next so I wont be covering much of the setup of Firebase or Firestore BUT I may add this in another post further down the line even if just for me to remember how i set everything up when i worked on a Firebase project recently.

### Writing Cloud Firestore security rules

You can find the accompanying repository on [Github](https://github.com/DanPurdy/firebase-firestore-rule-testing-demo)

At its most basic level you can write rules for `read` and `write` operations.
These rules can be broken down into the following actions:
#### read
1. get
1. list

#### write
1. create
1. update
1. delete

All pretty self explanatory. There are two main keywords that you need to be aware of when writing rules.
* Match - we use this statement to 'match' against documents in the firestore database
* Allow - precedes our rule expressions and defines access to documents within collections

In the example below we are allowing anyone to read (get and list) store documents and at the same time preventing anyone from writing to the stores list or documents.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /stores/{store} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Every single rule you have will ultimately return a boolean true/false. If true the action will be allowed if false it won't. Rules are not filters and cannot be used as such. For example if we only wanted to return all documents but our rule says to return true if the document is newer than 6 hours old - you couldn't write a rule to allow that and expect to get the filtered documents back, Firestore would actually say, well the rule says return true if all the documents are newer than 6 hours old but some of the documents i encountered are older than that so return false and return nothing. However if your query in your app specified to only give you results newer than 6 hours old then the list of documents would satisfy the rule and you would get a list of documents returned to you.

### Time for an example

First let us assume we are managing a database with a collection of stores, each store has a menu with a list of menu items and a staff list / roster that includes every member of staff. This would result in us having a document structure in Firestore similar to below:

```markdown
stores
  |_ store_A
          |_ menu
                |_ menu_item_A
                |_ menu_item_B
          |_ staff
                |_ staff_member_A
  |_ store_B
          |_ menu
                |_ menu_item_C
                |_ menu_item_D
          |_ staff
                |_ staff_member_B
                |_ staff_member_c
```

So firstly we should write down and describe what access people should be allowed (maybe treat as the basis for your tests!)
#### stores
1. Public should be able to see the stores
1. only verified staff members should be able to update stores
1. We should not be able to delete or create stores (maybe a super admin role in the future but for now it will happen in the firebase panel)

#### menus
1. menus should be publicly visible
1. menus should only be editable by members of staff for that store
1. menu items should be able to be deleted

#### staff
1. staff should not be publicly visible - only visible to other members of staff in the same store
1. staff members should not be able to update other staff member records (simplified solution here)
1. staff should be able to add a new staff member

so let us write those rules starting with the basics of any rules file

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if false;
    } 
  }
}

```
This first match rule applies to all documents at all levels and disallows any sort of action on it both read and write. This is a sensible default to have, later on when you add more documents and collections if you were to forget about your rules or if you just miss a case then everything is protected by default. This will not protect your data in cases where you mis-wrote a rule but nevertheless it prevents accidentally leaking new documents/collections.

Next let's look at our store rules:
```
match /stores/{storeId} {
  allow read: if true;
  allow create: if false;
  allow update: if isStoreStaff(storeId);
  allow delete: if false;
}
```
We allow full public read access and we disable create and delete for all. However update has a function! Cloud security rules allows you to add functions, below let us see how it works.

```
function isStoreStaff(storeId) {
  return storeId in request.auth.token.stores
}
```

So we're skipping a little bit here about how auth tokens work and specifically custom claims which i'll cover in another post and link here but for now you can check out the [docs](https://firebase.google.com/docs/auth/admin/custom-claims) for some basic examples.

On our users we have a custom claim called stores, it's an array of store ID's. When we add a staff member to a store we also put that store id into the stores property on their profile. We can then look for the current store document ID IN our users profile stores array, pretty cool that we can iterate over arrays in our rules too!

And yes this is a good idea, NoSQL databases don't support relationships in the way you may be used to in MySQL and therefore trying to look up a user ID and seeing if it exists on a store would mean pulling all the store documents and then pulling all of their staff collections and then checking over each staff document. Not only could this be fairly slow when you start to scale but it also could bankrupt you as each of those reads costs money! flattening out faux style relationships and keeping important information in two collections that refer to each other is fine and saves you a lot of time and effort. Notice also we are pulling the auth property from our request, rules by default have access to all of the request properties that were sent to retrieve the document(s) they also have access to the resource property which gives you access to the data your query would return.

Ok so now we're familiar with that let's look at our menus collection.
```
match /stores/{storeId} {
  allow read: if true;
  allow create: if false;
  allow update: if isStoreStaff(storeId);
  allow delete: if false;
  
  match /menu/{menuId} {
    allow read: if true;
    allow create, update: if isStoreStaff(storeId);
    allow delete: if false;
  }
}
  
```

First of all notice that it's nested inside our store, this follows the structure of our collections and sub collections but do note that your parent collection rules do not cascade to sub collections, they must have their own rules defined even if they match exactly those of their parent. Not much to add here - the rules are almost identical except also see that we have `create` and `update` on the same line, for verbosity you can comma separate the actions that have the same rules for each without having to write the rule twice. Also notice that because menu is a sub-collection of a store it has access to the storeId of the parent document as you would of had to pass that to request this data i.e. `/stores/:storeId/menu/:menuId`

Finally let's look at our staff collection. I've left off the menu collection below for clarity.

```
match /stores/{storeId} {
  allow read: if true;
  allow create: if false;
  allow update: if isStoreStaff(storeId);
  allow delete: if false;

  //menu here

  match /staff/{staffMemberId} {
    allow read, create: if isStoreStaff(storeId);
    allow update: if userOwnsDocument(staffMemberId);
    allow delete: if false;
  }
}
```

Again much the same as our menu collection but we have a new function `userOwnsDocument` which takes a staffMemberId, notice again that this is the id of the document we're trying to get to or update and would have been passed in the route to the document. 

```
function userOwnsData(staffMemberId) {
  return request.auth.uid != null && request.auth.uid == staffMemberId
}
```

Simple to understand right? We first make sure that the UID of our user exists in their auth token, then we check that the UID in the auth token matches the ID of the staff member we're trying to request.

so here's our rule file altogether

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if false;
    }
    
    match /stores/{storeId} {
      allow read: if true;
      allow create: if false;
      allow update: if isStoreStaff(storeId);
      allow delete: if false;
  
      match /menu/{menuId} {
        allow read: if true;
        allow create, update: if isStoreStaff(storeId);
        allow delete: if false;
      }
      
      match /staff/{staffMemberId} {
        allow read, create: if isStoreStaff(storeId);
        allow update: if userOwnsDocument(staffMemberId);
        allow delete: if false;
      }
    }
  }

  function isStoreStaff(storeId) {
    return storeId in request.auth.token.stores
  }
  
  function userOwnsData(staffMemberId) {
    return request.auth.uid != null && request.auth.uid == staffMemberId
  }
}

```

Great, we can sleep easy at night now, the bad guys can't get to our all important data or add to our stores menus. Whoah, not so fast there! Where are the tests? That's right you can and DEFINITELY SHOULD write tests to check each of these rules, no if's and no but's, ideally we would have written these before we even wrote the rules but let's leave the TDD argument alone for now. What we absolutely do not want to do is to start working on our code and then update or add a rule and start leaking data after all of our effort to write good rules initially, so yes lets let our tests give us a good indication that we messed up - it's almost inevitable!

I'll be covering the unit tests in part 2 of Firebase Cloud Firestore security rules - coming soon! 

You can find the accompanying repository on [Github](https://github.com/DanPurdy/firebase-firestore-rule-testing-demo)



