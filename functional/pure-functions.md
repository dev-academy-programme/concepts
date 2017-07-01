# Pure Functions

A pure function is a function which follow a specific set of rules:

* Will not mutate _any_ of its arguments
* Will not cause _any_ side effects outside of itself
* Will _always_ return the same value given the same arguments

Here is a simple example:

```js
const square = x => x * x  // ES6

function square (x) {      // ES5
  return x * x
}
```

Impure functions are less predictable. By definition, they mutate something; either something passed to it, or a variable outside of its scope.

```js
var someThing = []

function (x) {
  someThing.push(x)  // this will mutate someThing outside of the function's scope
  return x++         // this will mutate the variable that was passed in
}
```

