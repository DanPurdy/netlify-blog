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
You should already have your `firestore.rules` file adjacent to these two so the last thing we'll need to setup is an empty rules file so we can write dummy data to the our test database with full unrestriaccess 
