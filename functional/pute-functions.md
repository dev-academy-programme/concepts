A pure function is a function which takes arguements but which does not mutate any aguements that it's given.
The advantage of pure functions is that whenever you give them a particular variable(s), they will always have the same output and effect.

```js
const square = x => x*x  // ES6

function square(x) {     // ES5
  return x*x
}
```

Functions that are not pure have less predictable effect - by definition, they mutate something, either something it's passed, or some variable outside of it's scope.

```js
var someThing = []

function(x) {
  someThing.push(x)  // this will mutate someThing outside of the function's scope

  return x++         // this will mutate the variable that was passed in
}

```