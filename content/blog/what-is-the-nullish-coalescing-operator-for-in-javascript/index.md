---
path: javascript-what-is-nullish-coalescing-in
date: 2021-02-02T23:37:08.391Z
title: What is the nullish coalescing operator for in JavaScript
description: I'm frequently asked why you would use the nullish coalescing
  operator rather than a simple OR operator, time to look at the differences
---
A question that seems to pop up regularly, whether in group chats with other devs or during PR's, is why use the nullish coalescing operator rather than a simple OR operator, now that more and more JavaScript developers are starting to use and get familiar with the features of es2020 in JS or early on in TypeScript (if you're not using it, why not?) you're going to be seeing it more and more and it's important to know the difference.

## What is the nullish coalescing operator?

Firstly it's denoted by the following notation `??` - two questions marks. You use it in the same place you might use the or operator but there's significant difference between the two. With the OR operator `||` if the left hand operand is falsey then the right hand operand is returned. With null coalescing if the left hand operand is null or undefined then the right hand operand is returned but if the left hand operand is only falsey and not undefined or null then the left hand operand is returned.

Why is this useful? An example for its use might be that you have a function that takes a property that you expect to be false or the value 0 but you want to make that if that property is null or undefined that you can set a default. So rather than doing lots of typeof checks on the prop we can now use the null coalescing operator!

Lets see that rather contrived example in place

```javascript
const countOrDefault = (count) => {
  return count ?? 'default';
}

console.log(countOrDefault(null)); // 'default'
console.log(countOrDefault(0)); // 0
console.log(countOrDefault()); // 'default'
```

now what if we had used the logic OR operator here instead

```javascript
const countOrDefault = (count) => {
  return count || 'default';
}

console.log(countOrDefault(null)); // 'default'
console.log(countOrDefault(0)); // 'default' <--
console.log(countOrDefault()); // 'default'
```

How would we of written this before though using typeof?

```javascript
const countOrDefault = (count) => {
  return (typeof count === 'undefined' || count === null) ? 'default' : count;
}

console.log(countOrDefault(null)); // 'default'
console.log(countOrDefault(0)); // 0
console.log(countOrDefault()); // 'default'
```

Much harder to read, and more for my lazy (read efficient) self to type.


## Show me some more examples!

```javascript
const a = null;
const b;
const c = false;
const d = 0;
const e = '';

a ?? true; // true
b ?? true; // true
c ?? true; // false
d ?? true; // 0
e ?? true; // ''

a || true; // true
b || true; // true
c || true; // true
d || true; // true
e || true; // true
```

Hopefully that helps clear it up!