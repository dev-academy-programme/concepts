Object Oriented programming (OO) is a pattern of organising code that involves thinking about the things you're dealing as being **instances** of particular objects.

We often want to store particular details (**state**) and perform particulr actions (**behvaiour**) which are just relevant to a particular type of this, OO allows us to pull all this together in one place.

For example, all instances of a `User` object might have a particular state (e.g. name, email, isAwake) and have particular methods you could call on that user, e.g. if `piet` is an instance of `User`, you could call `piet.getEmail()` or `piet.wakeUp()`, or `piet.introduceYourself(dave)`.

Objects are a way of collecting concerns and functions into bundles which can help keep you code tidier.
If you're ever wondering which object should own a function, you can ask yourself the question :

> Should this thing know about this concept, is it this object's responsibility?

e.g. Should I be able to ask a Cat what it's email is? ... No, that's that's Owner that has an eamil. I should be able to ask Cat about it's owner, and ask owner about it's email.


#### Prototype-based OO

Constructors are the prototype-way to do OO in javascript.


#### Class-based OO

Classes are similar to Constructors, but they have a number of additional features:
  - **inheritance** : classes can inherit from / extend existing classes
    - e.g. if `Animal` is a class with animal-like functions, then we can make a new class called `Bat` which _inherits_ all those functions, and we can add new ones, like `echoLocate()` and `fly()` which are particular to bats.
  - special methods : constructors, getters, setters


## New Terminology

- instance
- instantiate
- state + behaviour
- prototype (like a template)
