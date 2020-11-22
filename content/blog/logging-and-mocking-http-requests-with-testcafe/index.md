---
path: logging-and-mocking-http-requests-with-testcafe
date: 2020-09-16T22:47:50.855Z
title: Logging and mocking HTTP requests with TestCafe
description: "A look into how to intercept, log and mock http requests within
  your end to end tests using TestCafe. "
---
Logging and mocking of HTTP requests are both essential and incredibly useful tools when writing robust end to end tests or integration tests.

Logging is used to record the HTTP requests that your application may make during a test and also gives you easy access to validate the responses and data those requests may receive from your backend systems.

Mocking is used to substitute parts of your infrastructure that you may not want your application to contact while under test or to perhaps prevent your systems entering an unexpected state while under test or the most relevant use case - testing error states when receiving errors from your backend. 

I tend to attach request loggers to any calls that are directly involved in the current test i'm running. An example may be that you have a submit button on a form and you're looking to check that if a form is invalid it is prevented from being submitted. Attaching a logger to log any requests to the endpoint that that form would hit if valid means i am able to verify that no calls were made when they shouldn't have, not relying on purely the state of the form for my test result.

### Request Logging

How do we setup a logger in TestCafe? It's actually extremely simple.

```js
// #e2e/mocks/submit-application.ts

import { RequestLogger } from 'testcafe';

// Add a new regexp instance containing a unique part of the endpoint you want to log 
const submitApplicationUrl = new RegExp('/submit-application');

// Create a requestLogger for any POST requests and log the request and response details
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

We add a logger to all POST requests that would hit the endpoint `/submit-application` we also make sure to tell TestCafe to log the request body and the response headers/body. This will be useful to ensure that the data we sent was accurate and the data we received was also what was expected.

```js
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

In the example above you can see that we attach our logger to our tests requestHooks. You can attach a logger to each test easily by adding request hooks to your fixture i.e. 

```js
fixture.page().requestHooks([submitApplicationLogger])
```

Remember to use your request mocks inside of an array if attaching to your fixture. This is also applies if you want to add more than one request logger to either your fixture or your test.

Once you have this setup you can go ahead and write assertions against calls that take place during your tests. In the case above any POST message to the /submit-application endpoint. You can use 4 methods

1. contains - Use to validate the request contains something you 'expect' i.e. status code
1. count - The number of requests that hit the logger
1. clear - clear the logged requests
1. requests - Returns an array of logged requests

below is a contrived example of each in a test

```js
test.requestHooks([signupLogger])('should test our request', (t) => {
  await t
    .click(...) // something that triggers a request?
    .expect(signupLogger.contains(r => r.response.statusCode === 200))
    .ok()
    .expect(signupLogger.count(() => true))
    .eql(1)
    .expect(signupLogger.requests[0].request.method)
    .eql('post', 'Request method should have been of type POST')
    .expect(
        signupLogger.contains(record => {
          const requestBody = JSON.parse(record.request.body);
          // Check fields and their values in the post request body
          return (
            requestBody.name === 'test' &&
            requestBody.acceptedTermsAndConditions === true
          );
        }),
      )
    .ok('The marketing accepted flag should be false, the cityID should be set correctly and latest terms flag should be true');

    signupLogger.clear(); // reset the logger
    
  await t
    .click(...) // trigger the request again?
    .expect(signupLogger.count(() => true))
    .eql(1); // 1 request again as we cleared, if we hadn't this would equal 2
});
```

### Request mocking

Mocking is incredibly simple. You can think of them exactly the same was as any sort of test mocking. You're writing functionality to replace something that would happen in your real life application and controlling how it responds. Maybe you want to ensure that your app responds correctly to a 500 response from your login endpoint. Obviously you shouldn't add a way for your actual production code to throw an error just for your tests! 

Following on from our submit application example above you could add a mock the following way:

```js
import { RequestMock } from 'testcafe';

const submitApplicationUrl = new RegExp('/submit-application');

export const submitApplicationMockSuccess = RequestMock()
  .onRequestTo({ url: submitApplicationUrl, method: 'POST' })
  .respond({ success: true }, 200, { 'Access-Control-Allow-Origin': '*' });

export const submitApplicationMockError = RequestMock()
  .onRequestTo({ url: submitApplicationUrl, method: 'POST' })
  .respond({ success: false }, 500, { 'Access-Control-Allow-Origin': '*' });
```

We've defined two mocks, one for a successful response and one for the error response we mentioned. Notice the access-control-allow-origin header, You'll need to add this to all mocks to prevent any CORS issues as all your endpoints HTTPS endpoints - which they all should be!

You can now attach these to your tests the same way as you would a logger.

```js
test.requestHooks([submitApplicationMockSuccess])('test to do something' t => { 
  // Guaranteed to receive a 200 response to any call to our mocked endpoint here
}); 

// Will attach the mock to each test
fixture`My Fixture`.beforeEach(() => { 
  ... 
}).requestHooks([submitApplicationMockSuccess])
// Any call to our mocked endpoint in every test in our fixture will receive our mock response
```

You can then combine with the request logger to ensure your request doesn't hit your backend, responds in a defined way and you can still test that your request included all the details you wanted as we showed with the request body example above. Perfect!

```js
test.requestHooks([submitApplicationMockSuccess, submitApplicationLogger])('test to do something' t => {
  // Any request to /submit-application will now be mocked and logged for full test control
})
```

And that's it the simple ability to validate both what your application is sending to your backend within the context of an e2e test and the ability to also bypass your backend for specified endpoints and mock the responses you want to test or should expect.

In general I follow the rule of logging all requests in my tests to validate the data I'm sending is what I would expect and I keep mocking only for those cases that our actual backend cannot easily respond with. This means our e2e tests probably straddle both our front end application and our backend services - i'll leave you to decide whether you want that or not but it's nice to have an extra warning that something may be awry with our backend.




