An important thing to remember about functions in JavaScript is: *Functions are values*

This means that functions are treated like first-class citizens like numbers and objects. They have all the properties we expect of other objects.

http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/

So lets looks at this example:

```
// A named function
function triple(x) {
  return x * 3
}

// An annonymous function
function (x) {
  return x * 3
}

// An annonymous function assigned to a variable
var triple = function (x) {
  return x * 3
}
```

Because the last example is a variable, you can do some cool things like this:

```
var engorgio = triple
var value = engorgio(30) // value is 90
```

But the fun does not stop there! We can also pass functions into other functions as arguments!

A good example of this is the filter function, probably the most basic and useful higher order function. It's a function that operates on an array, and accepts another function as an argument that it uses to return a new filtered version of the array.

Let's pop over to this repl.it and have a play
[https://repl.it/CGjq](https://repl.it/CGjq)

So, to recap:

  - We can store functions in variables
  - We can store these as properties of other objects
  - They can have properties
  - We can pass them as arguments into functions

