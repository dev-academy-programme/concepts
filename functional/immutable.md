# Immutability

Immutability is a pattern which asserts you're not permitted to mutate (change) an object once it's made.

To _change_ and object after it has been created, you must make a 'new' object, which is a clone of the original that includes the changes.

This seems inconvenient, but affords some massive gains in certain contexts, such as when you're trying to determining whether anything has changed in a large data structure.

`Immutable` is a popular library to help you achieve this behaviour.

https://facebook.github.io/immutable-js | https://www.npmjs.com/package/immutable

It provides objects which have methods you will be familiar with, but are immutable:

| Node     | Immutable.js     |
| -------- | ---------------- |
| `Array`  | `Immutable.List` |
| `Set`    | `Immutable.Set`  |
| `Object` | `Immutable.Map`* |

* _Technically, there's a [Map in ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) which you could read about._

