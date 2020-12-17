---
path: firebase-cloud-firestore-security-rules
date: 2020-12-16T23:08:41.817Z
title: Firebase Cloud Firestore security rules
description: An introduction to Cloud Firestore security rules and how to unit
  test them to help secure your firebase application
---
# What is Firebase Cloud Firestore

Briefly... 

> Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - at global scale.

What that really means is it's a really simple way for you to get setup with a cloud based NoSQL database and focus on building your application rather than worry about all the overhead of setting up a database with a pretty generous free tier where the cost scales seemingly well as you move to that 'global scale'.
Firestore is not to be confused with the familiar Firebase offering of Realtime Database that they've been famous for and which ultimately led to their takeover by Google back in 2014, since then Firebase have diversified into many areas similar to jamstack providers like Netlify etc by offering hosted serverless functions, hosting, authentication tooling all powered through the GCP platform.

As with any data we keep or expose in some way to the internet we need to keep it secure and make sure only our application and those we deem trustworthy can access it.

Firestore comes with security rules, we can write these rules to give granular control to how certain documents can be read/updated etc within our database and when using the authentication tooling provided by Firebase in your app you can allow role based access and permissions with very little effort.

I want to focus on the rules and how you can write tests against these in this post so I wont be covering much of the setup of Firebase or Firestore BUT I may add this in another post even if just for me to remember how i set everything up!

## Writing Cloud Firestore security rules

At its most basic level you can write rules for `read` and `write` operations.
These defaults can be broken down into the following:
#### read
1. get
1. list

#### write
1. create
1. update
1. delete

All pretty self explanatory. There are two main keywords that you need to be aware of when writing rules.
* Match - we use this statement to 'match' against documents in the firestore database
* Allow - proceeds our rule expressions and gives access to documents

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

Every single rule you have will ultimately return a boolean true/false. If true the action will be allowed if false it won't. Rules are not filters and cannot be used as such though. For example if we only wanted to return all documents but our rule says to return true if the document is newer than 6 hours old - you couldn't write a rule to allow that and expect to get the filtered documents back, firestore would actually say well the rule says return true if the documents are newer than 6 hours we can return but some of the documents are old so return false. However if your query specified to only give you results newer than 6 hours old then the list of documents would satisfy the rule and you would get a list of documents returned to you.



### Time for an example

First lets assume we are managing a database of stores, each store has a menu with a list of menu items and a staff list / roster that includes every member of staff. This would result in us having a document structure in Firestore similar to below.

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

So firstly we should describe what access people should be allowed
#### stores
1. 