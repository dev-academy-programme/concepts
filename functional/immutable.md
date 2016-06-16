Immutability is a pattern which asserts you're not permitted to mutate (change) an object once it's made.
To make a change you need to make a 'new' object, which is a clone with the changes you want / need.

This seems inconvenient, but affords some massive gains in certain contexts (e.g. when you're trying to determining whether anything has changed in a large data structure)

https://facebook.github.io/immutable-js/ | https://www.npmjs.com/package/immutable

Immutable.js provides objects which have methods you will be familiar with, but are immutable:

Node   | Immutable.js | notes
-------|--------------|-----
`Array`  | `Immutable.List` |
`Set`    | `Immutable.Set`  |
`Object` | `Immutable.Map`  | _technically, there's a [Map in ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) which you could read about_