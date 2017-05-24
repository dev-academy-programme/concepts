# Object-orientation (OO) in JavaScript

* Object-orientation in general
* Classical inheritance
* Prototypal inheritance
* Success without object-orientation


## Object-orientation in general

Object orientation is a paradigm or style of designing software, which models the solution into _objects_. Objects are constructs that include both data (called properties) and behaviour (called methods). For example, a `dog` object could have a `hairColor` and `isTired` properties as well as `bark()` and `sleep()` methods. By combining the data and behaviour into a single construct, it is possible for the behaviour of an object to modify the data of the object. Objects are often designed around real world objects.

## Notes/progression from the lecture

Order that we built the demo files:

1. `simple-objects.js`
2. `inheritance.js`
3. `index.js`

Flow of the discussion:

* We want a construct that has data and behaviour (the defining characteristic of OO)
  - Create an object with `{}`
```js
  const rectangle = {
    width: 100,
    height: 200,
    getArea: () => {
      return this.width * this.height
    }
  }
```
`this` is always going to be in a function, and refers to the object the function belonged to when it was called.

* This is fine when you want one, but what happens when you want a lot of them (all with the same properties/shape)
  - Refactor into a function that takes arguments
  
```js
function getRectangle (width, height) {
  return {
    width: width,
    height: height,
    getArea: () => {
      return this.width * this.height
    }
  }
}
```
* Now we want an object that's mostly similar to an existing one (i.e. a subtype - square from a rectangle)

```js
function getSquare (size, color) {
  return {
    width: size,
    height: size,
    color: color,
    getArea: () => {
      return this.width * this.height
    }
  }
}
```

* Now we have some duplication when we really don't need it. Let's reuse the rectangle from the square.

```js
function getSquare (size, color) {
  const square = getRectangle(size, size)
  square.color = color
  return square
}
```

* the drawbacks of this approach is that a rectangle is created for every square we created
* we need a prototype of a rectangle to base the square off (not the rectangle itself)

```js
function getSquares (size, colors) {
  const rectangle = getRectangle(size, size)
  return colors.map(color => {
    const square = Object.create(rectangle)
    square.color = color
    return square
  })
}
```
  - Refactor the factory function into a constructor function
  - Describe what `new` does
  - But how do we connect the two types?
  - Describe what the prototype is
    * `.prototype` versus `__proto__`
    * `Object.create()`
  - Show (using the debugger) how the prototype looks
  - Create a new object and show how it has a `hasOwnProperty` property even though we didn't explicitly add it
  - Illustrate in code how the prototype chain works
* How does the syntax change in ES6?
  - `class`
  - `constructor`
  - `extends`
  - `super`
* How do we use this according to best practices?
  - Try to avoid OO in JS (opt for a functional design)
  - If you decide to (or have to) apply OO principles
    * Do NOT create object heirarchies
    * Consider all object immutable (behaviour should NOT change object state/properties)

## For more information

* https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
* https://gist.github.com/don-smith/f8af54042cdafc5e95c59e33fa349427
