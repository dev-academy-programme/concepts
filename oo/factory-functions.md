# Factory Functions

Like a closure, but returns an object. You can store details, prep the layout, and attach functions to your object.

```js
function personFactory (name) { 
  return {
    name: name,
    age: undefined,
    introduceYourself: () => `Hi, my name is ${name}`
    }
  }
}

var vanessa = personFactory('Vanessa Churchill')

console.log(vanessa)
console.log(vanessa.introduceYourself())
```

There's a small detail where if you are making more than 10,000 objects with a factory function, you should consider moving to classes, which start to be more performant in that range (more on this later).

