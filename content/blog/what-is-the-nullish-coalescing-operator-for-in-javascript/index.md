---
path: javascript-what-is-nullish-coalescing-in
date: 2021-02-03T00:46:38.844Z
title: What is the nullish coalescing operator for in JavaScript
description: I'm frequently asked why you would use the nullish coalescing
  operator rather than a simple OR operator, time to look at the differences
---
A question that seems to pop up regularly, whether in group chats with other devs or during PR's, is why use the nullish coalescing operator rather than a simple OR operator? Now that more JavaScript developers are starting to use and get familiar with the features of es2020 in JS or early on in TypeScript (if you're not using it, why not?) you're going to be seeing it more frequently and it's important to know the difference and how to use it.

## What is the nullish coalescing operator?

Firstly it's denoted by the following notation `??` - two questions marks. You use it in the same place you might use the or operator but there's significant difference between the two. With the OR operator `||` if the left hand operand is falsey then the right hand operand is returned. With nullish coalescing if the left hand operand is null or undefined then the right hand operand is returned but if the left hand operand is only falsey and not only undefined or null then the left hand operand is returned.

Why is this useful? An example for its use might be that you have a function that takes a property that you expect to be false or the value 0 but you want to make it so that if that property is null or undefined that you can set a default value but still use the falsey values. So rather than doing lots of typeof checks on the property we can now use the nullish coalescing operator!

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

How would we of written this before without nullish coalescing using typeof instead?

```javascript
const countOrDefault = (count) => {
  return (typeof count === 'undefined' || count === null) ? 'default' : count;
}

console.log(countOrDefault(null)); // 'default'
console.log(countOrDefault(0)); // 0
console.log(countOrDefault()); // 'default'
```

Much harder to read, much more for my lazy (read efficient) self to type I think you'd agree.


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