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

They do not execute their body the same way as a normal function, instead they return an iterator object. An iterator object allows you to call a next method to execute part of the generator functions body up until the next yield allowing you to control what the function yields to you over multiple calls or invocations. You can read a much more in-depth description at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

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

## Why are they useful in mocks
  * example endpoint
  * what do we want to achieve
  * booking details generators
* implementation
  * setup of the generator and mock
  * using within a test
* closing thoughts
  * ease of use
  