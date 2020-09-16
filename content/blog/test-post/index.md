---
path: logging-and-mocking-http-requests-with-testcafe
date: 2020-09-16T22:47:50.855Z
title: Logging and mocking HTTP requests with Testcafe
description: "A look into how to intercept, log and mock http requests within
  your end to end tests using Testcafe. "
---
Logging and mocking of HTTP requests are both essential tools when writing robust end to end tests or integration tests.

Logging is used to record the HTTP requests that your application may make while under test and also the responses those requests may receive from your backend systems.

Mocking is used to substitute parts of your infrastructure that you may not want your application to contact while under test or to perhaps prevent your systems entering an unexpected state while under test.

I tend to attach request loggers to any calls that are directly involved in the current test i'm running. An example may be that you have a submit button on a form and you're looking to check that every single required input on your form when left empty prevents your form being submitted. Attaching a logger to log any requests to the endpoint that that form would hit if correctly submitted means i am able to verify that no calls were made when they shouldn't have, not relying on purely the state of the form for my test result.

How do we setup a logger in Testcafe? It's actually extremely simple.

```js
// #e2e/mocks/submit-application.ts

import { RequestLogger } from 'testcafe';

const submitApplicationUrl = new RegExp('/submit-application');

export const submitApplicationLogger = RequestLogger(
  { url: submitApplicationUrl, method: 'POST' },
  {
    logRequestBody: true,
    stringifyRequestBody: true,
    logResponseHeaders: true,
    logResponseBody:    true
  },
);
```

We add a logger to all POST requests that would hit the endpoint `/submit-application` we also make sure to tell testcafe to log the request body and the response headers/body. This will be useful to ensure that the data we sent was accurate and the data we received was also what was expected.

```
// #e2e/tests/submit-application.ts
import { BASE_URL } from '../config';
import { SubmitForm } from '../page-objects/submit-application';
import { submitApplicationLogger } from '../mocks/submit-application';

fixture`submit-application`
  .page`${BASE_URL}/submit-application`
  
test.requestHooks(submitApplicationLogger)(
  'ensure invalid from does not submit', async () => {
     await t
       .click(SubmitForm.submitButton)
       .expect(SubmitForm.errorMessage.exists)
       .ok('Submit application form error should exist')
       .expect(submitApplicationLogger.count(() => false))
       .eql(0);
  });
```
In the example above you can see that we attach our logger to our tests requestHooks. You can attach a logger to each test easily by adding request hooks to your fixture i.e. `fixture.page().requestHooks()`