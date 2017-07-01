# Object-orientation (OO) in JavaScript

* Object-orientation in general
* Prototypal inheritance
* Classical inheritance

## Object-orientation in general

Object orientation is a paradigm or style of designing software, which models the solution into _objects_. Objects are constructs that include both data (called properties) and behaviour (called methods). For example, a `dog` object could have a `hairColor` and `isTired` properties as well as `bark()` and `sleep()` methods. By combining the data and behaviour into a single construct, it is possible for the behaviour of an object to modify the data of the object. Objects are often designed around real world objects.


## Part 1 - Prototypal Inheritance

We want a construct that has data and behaviour (the defining characteristic of OO).

Create an object with `{}`:

```js
  const rectangle = {
    width: 100,
    height: 200,
    getArea: function () {
      return this.width * this.height
    }
  }

  console.log(rectangle)
```

The `this` keyword is always in a function. It refers to the object the function belonged to when it was called.

This approach is fine when you want a single object, but what happens when you want multiple objects, all with the same shape (properties).

  Refactor it into a function that takes the necessary arguments:

  ```js
  function getRectangle (width, height) {
    return {
      width: width,
      height: height,
      getArea: function () {
        return this.width * this.height
      }
    }
  }
  ```

Great, but now we want an object that's mostly similar to an existing one with additional properties, such as `color`.

  ```js
  function getSquare (size, color) {
    return {
      width: size,
      height: size,
      color: color,
      getArea: function () {
        return this.width * this.height
      }
    }
  }
  ```

But now we have some unwanted duplication, but we do want the rectangle's _base_ properties. This new _type_ of object is often called a subtype (i.e. a square is a subtype of rectangle).

  ```js
  function getSquare (size, color) {
    const square = getRectangle(size, size)
    square.color = color
    return square
  }
  ```

The drawbacks of this approach is that a rectangle is created for every square we create. For example:

  ```js
  function getSquares (size, colors) {
    return colors.map(color => {
      const square = getRectangle(size, size)
      square.color = color
      return square
    })
  }
  ```

This duplication is a problem if we create a **lot** of squares because it uses much more memory than we need to. We would rather share a single rectangle to base the square off of. We call this shared object a prototype.

[Include an illustration that shows the before and after of using a prototype](#illustration)

  ```js
  function getSquares (size, colors) {
    const rectanglePrototype = getRectangle(size, size)
    return colors.map(color => {
      const square = Object.create(rectanglePrototype)
      square.color = color
      return square
    })
  }
  ```

When we base an object off of another object using a prototype, it creates a chain between the objects and their prototypes. We create this relationship using `Object.create`. We'll see the advantage of the _prototype chain_ shortly.

The nice thing about using the same rectangle object for each square is that if we want to change the common properties of all the squares, we can just change the rectangle's properties.

Unfortunately, because we're creating the prototype in `getSquares`, we don't have direct access to the prototype. We can change that by converting the `getRectangle` factory function into a _constructor_ function.

  ```js
  function Rectangle (width, height) {
    // data of the prototype
    this.width = width
    this.height = height
    this.getArea = function () {
      return this.width * this.height
    }
  }

  const rectangle = new Rectangle(5, 10)
  ```

Notice the capital `R` of rectangle. This is _only_ a convention and doesn't have any influence on how JavaScript treats the function.

However, the drawbacks of this approach is that the `getArea` function is created for every Rectangle we created. We need to put this function onto the Rectangle's prototype.

```js
function Rectangle (width, height) {
  // the 'new' keyword makes some things implicit
  // data of the prototype
  const this = {} // implicit
  this.width = width
  this.height = height
  return this // implicit
}

// behaviour of the prototype
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}

const rectangle = new Rectangle(5, 10)
console.log(rectangle.getArea())
```

This keyword `new` creates a copy of the constructor function's prototype and is already linked in the prototype chain (similar to `Object.create()`).

Now let's use the `Rectangle` as a subtype of a square.

```js
function Rectangle (width, height) {
  // data of the prototype
  this.width = width
  this.height = height
}

// behaviour of the prototype
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}

function getSquares (size, colors) {
  const rectangle = new Rectangle(size, size)
  return colors.map(color => {
    const square = Object.create(rectangle)
    square.color = color
    return square
  })
}

const squares = getSquares(10, ['red', 'green', 'blue'])
Rectangle.prototype.getAreaX2 = function () {
  return this.getArea() * 2
}
console.log(squares[0].getAreaX2()) // 200
// Notice how changing the prototype affected the squares already created
```

While this works, what if we wanted to have a `Square` constructor function like the `Rectangle` and we want it to have the `Rectangle` prototype. 

```js
function Rectangle (width, height) {
  // data of the prototype
  this.width = width
  this.height = height
}

// behaviour of the prototype
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}

function Square (color, size) {
  Rectangle.call(this, size, size)
  this.color = color
}

Square.prototype = Object.create(Rectangle.prototype)
Square.prototype.constructor = Square

function getSquares (size, colors) {
  // const rectangle = new Rectangle(size, size)
  return colors.map(color => {
    return new Square(color, size)
  })
}

const squares = getSquares(10, ['red', 'green', 'blue'])
```

This is called Prototypal inheritance and represents the end of the first leg of our journey to understanding object orientation in JavaScript. The code we've explored on this journey has led us to here, but we wouldn't write that code in normal situations. The previous example represents the common way to _do_ object orientation in ES5.

After a brief intermission to learn how to manage a function's object context (the `this` keyword) we'll learn about the common way to do object orientation in ES6 and beyond.


## Part 2 - Call, Apply and Bind

One of the coolest features of JavaScript functions is the ability to control their context. Functions can either not have a context or use an object as its context so it can easily access the other parts of the object.

```js
// this has not been established
function doSomething () {
  console.log(this)
}
doSomething()

// this will be obj
const obj = {
  prop: 'hi there',
  doSomethingElse: function () {
    console.log(this.prop)
  }
}
obj.doSomethingElse()
```

By default, a function's context is the object the function was called from. But we also have the ability to chance that context with the `call`, `apply` and `bind` functions.


## Part 3 - Classes

```js
class RectangleClass {

  constructor(width, height) {
    this.width = width
    this.height = height
  }

  getArea () {
    return this.width * this.height
  }

}

class SquareClass extends RectangleClass {

  constructor (size, color) {
    super(size, size)
    this.color = color
  }

}

const squareClass = new SquareClass(10, 'red')


```

* But how do we connect the two types?
* Describe what the prototype is
  * `.prototype` versus `__proto__`
    * `Object.create()`
  * Show (using the debugger) how the prototype looks
  * Create a new object and show how it has a `hasOwnProperty` property even though we didn't explicitly add it
  * Illustrate in code how the prototype chain works
* How does the syntax change in ES6?
  * `class`
  * `constructor`
  * `extends`
  * `super`
* How do we use this according to best practices?
  * Try to avoid OO in JS (opt for a functional design)
  * If you decide to (or have to) apply OO principles
    * Do NOT create object heirarchies
    * Consider all object immutable (behaviour should NOT change object state/properties)


## For more information

* <https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain>
* <https://gist.github.com/don-smith/f8af54042cdafc5e95c59e33fa349427>

