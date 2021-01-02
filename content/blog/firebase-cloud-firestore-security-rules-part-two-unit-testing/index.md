---
path: firebase-cloud-firestore-security-rules-unit-testing
date: 2020-12-22T17:03:35.330Z
title: Firebase Cloud Firestore security rules - Part two - unit testing
description: A look at how to write unit tests for Firebase Cloud Firestore
  security rules to help ensure your data is secure.
---
This post is the second post in a two part look at Firebase Cloud Firestore security rules and how to unit test them. You can find part one at [Firebase Cloud Firestore security rules - Part one - Writing the rules](https://dpurdy.me/blog/firebase-cloud-firestore-security-rules/)

## Setting up

As in the previous article I'll be making the assumption that you already have your development environment setup and the ability to run the Firebase Firestore emulator which you'll need in order to run your tests. We'll also be assuming that all of your Firestore rules and tests etc will be stored in a `firestore` folder at the root of your project.

We'll be using Jest as our test runner. We'll also need to install the firebase rule testing package

```
npm i --save-dev @firebase/rules-unit-testing
```

some of the tests may take a while to execute so it's a good idea to up the jest timeout, you can set this easily, create a `jest.setup.js` file at the root of your firestore folder.

```javascript
jest.setTimeout(20000);
```

You then setup a `jest.config.js` file to make sure your tests are running in the correct environment and that your timeout settings above are loaded.

```javascript
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
```

You should already have your `firestore.rules` file adjacent to these two so theres one last thing we'll need to setup.

We're going to want to be setting default or dummy data into our Firestore emulator before many of our tests. We can use the `loadFirestoreRules` method from the rules-unit-testing package to load different rules on the fly so one simple setup pattern is to provide an unrestricted ruleset such as below

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Save this file as `firestore-test.rules` we can then reference it inside of our test setup helper. Next we create a `tests` folder and within that we create a folder for each of our collections that we will test.

### Setup and teardown helpers

In all of our tests we're going to want to initialise a test user, possibly some dummy data and our test app that we will run our requests against and obviously straight after we'll need to teardown that user and the data ready for our next tests.
To aid this there are two simple setup methods we can create and use them in all of our subsequent tests. Create a file called helpers at the root of your tests folder

`/firestore/tests/helpers.js`
```javascript
const { apps, initializeTestApp, loadFirestoreRules } = require('@firebase/rules-unit-testing');
const { readFileSync } = require('fs');

module.exports.setup = async (auth, data) => {
  const projectId = `rules-spec-${Date.now()}`;
  const app = await initializeTestApp({
    projectId,
    auth,
  });

  const db = app.firestore();

  // Apply the test rules so we can write documents without needing the admin app
  await loadFirestoreRules({
    projectId,
    rules: readFileSync('firestore/firestore-test.rules', 'utf8'),
  });

  // Write mock documents before rules
  if (data) {
    for (const key in data) {
      const ref = db.doc(key);
      await ref.set(data[key]);
    }
  }

  // Apply rules
  await loadFirestoreRules({
    projectId,
    rules: readFileSync('firestore/firestore.rules', 'utf8'),
  });

  return db;
};

module.exports.teardown = async () => {
  Promise.all(apps().map((app) => app.delete()));
};

```
Our setup method above creates a test app with our auth options and then creates a reference to our Firestore instance, next it loads our unrestricted rules set and then iterates over our dummy data inserting it into our Firestore instance. Finally once all of our dummy data has been written we load and apply our actual ruleset that we wrote in [part 1](https://dpurdy.me/blog/firebase-cloud-firestore-security-rules/) and return the database reference. The teardown method is fairly setup explanatory where it just deletes all data from our Firestore database.

## Default ruleset tests
We previously wrote a default rule to ensure that any sort of extra collection we add without rules would be read and write protected, this should therefore definitely be the first place we test.

`/firestore/tests/default.test.js`
```javascript
const { setup, teardown } = require('./helpers');
const { assertFails } = require('@firebase/rules-unit-testing');

describe('Default firestore rules', () => {
  let db;
  let ref;

  beforeAll(async () => {
    db = await setup();
    ref = db.collection('non-existsant-collection');
  });

  afterAll(async () => {
    await teardown();
  });

  test('fail when trying to read from an unauthorised store', async () => {
    expect(await assertFails(ref.get()));
  });

  test('fail when trying to write to an unauthorised store', async () => {
    expect(await assertFails(ref.add({})));
  });
});

```
Again, fairly self explanatory - set up a random collection and assert that both a get request and an add request fail.

Next let's test our `stores` collection, heres a reminder of the rules we have in place.

```javascript
match /stores/{storeId} {
  allow read: if true;
  allow create: if false;
  allow update: if isStoreStaff(storeId);
  allow delete: if false;
}
```

We'll start with the read/get rule. As it's open to everyone we more want to make sure that this remains readable to all types of users whether authenticated or not.

First let's make sure that non authenticated users can read from our stores collection.

```javascript
test('succeed when a non authenticated user tries to load a store', async () => {
  const db = await setup(null, {
    'stores/ST01': {
      name: 'test',
    }, 
  });
  const ref = db.collection('stores');

  expect(await assertSucceeds(ref.doc('ST01').get()));
});

```

We pass `null` to our auth options and then pass a single default test store to our stores collection we then assert we can successfully read from this collection. We'll do much the same in our next test to ensure that an authenticated user can also read from this collection, to test this we just make sure we pass a user/auth object to our setup function.

```javascript
test('succeed when a authenticated user tries to load a store', async () => {
  const db = await setup(
    {
      uid: 'user',
    },
    {
      'stores/ST01': {
        name: 'test',
      },
    },
  );
  const ref = db.collection('stores');

  expect(await assertSucceeds(ref.doc('ST01').get()));
});
```

Let's see that all together for our first test.

```javascript
const { setup, teardown } = require('../helpers');
const { assertSucceeds } = require('@firebase/rules-unit-testing');

describe('Stores read rules', () => {
  describe('get', () => {
    afterAll(async () => {
      await teardown();
    });

    test('succeed when a non authenticated user tries to load a store', async () => {
      const db = await setup(null, {
        'stores/ST01': {
          name: 'test',
        },
      });
      const ref = db.collection('stores');

      expect(await assertSucceeds(ref.doc('ST01').get()));
    });

    test('succeed when a authenticated user tries to load a store', async () => {
      const db = await setup(
        {
          uid: 'user',
        },
        {
          'stores/ST01': {
            name: 'test',
          },
        },
      );
      const ref = db.collection('stores');

      expect(await assertSucceeds(ref.doc('ST01').get()));
    });
  });
});

```


