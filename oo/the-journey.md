# Object-orientation (OO) in JavaScript

* Object-orientation in general
* Classical inheritance
* Prototypal inheritance
* Success without object-orientation


## Object-orientation in general

Object orientation is a paradigm or style of designing software, which models the solution into _objects_. Objects are constructs that include both data (called properties) and behaviour (called methods). For example, a `dog` object could have a `hairColor` and `isTired` properties as well as `bark()` and `sleep()` methods. By combining the data and behaviour into a single construct, it is possible for the behaviour of an object to modify the data of the object. Objects are often designed around real world objects.

Object orientation promotes some notable concepts in software design.

* Encapsulation: the ability to hide data within an object and only provide access through its methods.
* Inheritance: the ability to create `is-a-type-of` object heirarchies (e.g. a Labrador is a type of Dog is a type of Mammal).
* Polymorphism: the ability for a method call to invoke the correct implementation based on the object's type.

### Encapsulation

When properties and methods are defined on a class, they can be designated with access modifiers (public, private, protected, etc.) that define which parts of the program have access to them.


## Classical inheritance

Objects are _instances_ of a _class_. A class is a type definition that describes the name and data type of the properties and the signatures of methods.


## Prototypal inheritance

Constructor functions (the ones that are capitalised) each have a property on them called `prototype` (this comes from the prototype of `Function`). When an instance of a type is created, that instance is simply a copy of that `prototype` property. To create a _is type of_ relationship, a constructor function just needs its `prototype` property to be linked with the prototype chain of the super-type.


## Notes/progression from the lecture

Order that we built the demo files:

1. `simple-objects.js`
2. `inheritance.js`
3. `index.js`

Flow of the discussion:

* We want a construct that has data and behaviour (the defining characteristic of OO)
  - Create an object with `{}`
* Now we want a lot of them (all with the same shape)
  - Refactor into a function that takes arguments
* Now we want an object that's mostly similar to an existing one
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
