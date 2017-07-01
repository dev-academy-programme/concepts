# Constructors

Constructors are similar to Factory functions but slightly different.

For example,

```js
var Person = function (name) {
  this.name = name
}

Person.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name)
}

var violet = new Person("Violet")
var damian = new Person("Damian")

violet.sayHello()
// Hello, I'm Violet
```

Constructors are just functions, but don't return objects by default.
We call constructors using the keyword `new` which instantiates a new instance of the prototype and returns and object (in our example a new `Person`).

Note we've also extending the Person prototype with a function (`sayHello`).

Constructors are slightly faster than factory functions, but there are a few gotchas that mean they're currently less popular. _**LIKE WHAT?**_

