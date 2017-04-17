An important thing to remember about functions in JavaScript is: *functions are values*.

This means that functions are treated as first-class citizens, just like numbers and objects. They have all the properties we expect of other objects. Check out Helen Emerson's [article on the subject](http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/) for a more in-depth explanation.

Let's look at this example:

```js
// A named function
function triple (x) {
  return x * 3
}

// An anonymous function
function (x) {
  return x * 3
}

// An anonymous function assigned to a variable
var triple = function (x) {
  return x * 3
}
```

Because the last example uses a variable, you can do some cool things like this:

```js
var engorgio = triple
var value = engorgio(30) // value is 90
```

Both `triple` and `engorgio` refer to the same function. But the fun does not stop there! We can also pass functions into other functions as arguments.

A good example of this is the filter function, probably the most basic and useful higher order function. It's a function that operates on an array, and accepts another function as an argument that it uses to return a new filtered version of the array.

Let's pop over to this repl.it and have a play: [https://repl.it/CGjq](https://repl.it/CGjq/26).

So, to recap:

* We can store functions in variables
* We can store functions as properties of other objects
* Functions can have properties
* We can pass functions as arguments into other functions
