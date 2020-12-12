---
path: javascript-generators-for-testing-mock-responses
date: 2020-12-08T19:02:03.979Z
title: Using generator functions to handle mock responses
description: A simple use case for javascript generator functions to handle
  repeatable and reliable mock endpoint responses in end-to-end or unit tests
---
## What is a generator function
In JavaScript a generator function is a special function that can maintain their state or context. They are denoted in javascript the following way
```js
function*() {
  yield 1;
  yield 2;
}
```

They do not execute their body the same way as a normal function, instead they return an iterator object. An iterator object allows you to call a next method to execute part of the generator functions body up until the next yield allowing you to control what the function yields to you over multiple calls. You can read a much more in-depth description at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

Below is an example of a generator that would increment a count for you.

```js

function* incrementGenerator(base) {
  let index = 0;
  while (true) {
    index += 1;
    yield base + index;
  }
}

const incrementer = incrementGenerator(10)

incrementer.next().value // 11
incrementer.next().value // 12
incrementer.next().value // 13

```

## Why are generators useful in mocks
Being able to easily control what generators return based on the number of times you increment the iterator means you can easily create repeatable and dependable mocks.

### Example

We have an endpoint that a user polls waiting for a status to be updated in our backend by a third party. I didn't want to add websockets for this single case, 99% of the time the endpoint will return a success on the 2nd call however we don't want our user to be sitting there with a never ending loading screen if the status is not updated by the third party, to prevent this we implemented a limit of around 10 calls before we show an error to the user and alert our ops team that something is wrong. We also need to handle the user getting a non pending success state after say 4 calls or an error state after 5 calls etc etc.
To simulate this for in our end-to-end tests I ended up setting up mocks with generators that we can guarantee will show a failure status after 5 calls without needing to change anything that the client does which makes this a fair test and also makes it easily readable without having to rely on other state tactics in our mocks.

Here's the generator
```js
const pendingToFailure = function*() {
  let index = 1;

  while (index % 4 !== 0) {
    yield {
      status: STATUS.PENDING,
    };
    index++;
  }

  yield {
    status: STATUS.FAILURE,
  };
};
```
So what's happening? Well on the 1st, 2nd and 3rd times we increment this generator we will yield an object with our status property set to 'pending' but on the 4th we will yield a status object set to 'failure'.

I then use this generator in our mock endpoint as below

```js
export const applicationCreatingFailureStatusMock = () => {
  const mockGen = pendingToFailure();

  return RequestMock()
    .onRequestTo(mockURL)
    .respond((req, res) => {
      res.headers['Access-Control-Allow-Origin'] = '*';
      res.statusCode = 200;
      res.setBody(JSON.stringify(mockGen.next().value));
    });
};

```
That's all there is to it. When our mock is instantiated it creates a generator instance and returns a request mock, the request mock uses the generator value to set the body based on how many times the generator has been incremented and seen as that increment happens on every request we are guaranteeing the response of a certain call.


## Summing it up
The simple example above can be modified to suit a whole host of needs when it comes to your tests. Generators allow you to produce repeatable and predictable outcomes without the need for tracking any sort of state, modifying how the client works in a way that wouldn't happen in the real world or passing extra data or parameters to functions/endpoints just to handle certain cases. 
This should always be something you strive for in testing. Tests should not be dependent upon the state or outcome of another test, you don't want to see cascading failures all because an early test failed. Being able to guarantee how your generator behaves and when and how you can expect data in our examples goes a long way to achieving this goal.

Happy testing.

