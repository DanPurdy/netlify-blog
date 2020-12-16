---
path: firebase-cloud-firestore-security-rules
date: 2020-12-16T23:08:41.817Z
title: Firebase Cloud Firestore security rules
description: An introduction to Cloud Firestore security rules and how to unit
  test them to help secure your firebase application
---
# What is Firebase Cloud Firestore

> Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - at global scale.

What that really means is it's a really simple way for you to get setup with a cloud based NoSQL database and focus on building your application rather than worry about all the overhead of setting up a database with a pretty generous free tier where the cost scales seemingly well as you move to that 'global scale'.
Firestore is not to be confused with the familiar Firebase offering of Realtime Database that they've been famous for and which ultimately led to their takeover by Google back in 2014, since then Firebase have diversified into many areas similar to jamstack providers like Netlify etc by offering hosted serverless functions, hosting, authentication tooling all powered through the GCP platform.

As with any data we keep or expose in some way to the internet we need to keep it secure and make sure only our application and those we deem trustworthy can access it.

Firestore comes with security rules, we can write these rules to give granular control to how certain documents can be read/updated etc within our database and when using the authentication tooling provided by Firebase in your app you can allow role based access and permissions with very little effort.



