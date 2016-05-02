A closure is a special kind of object that combines two things: a function, and the environment in which that function was created.

Here's a powerful pattern that is an example of a closure: imagine instead of making a function that just doubles, we could write a function that makes a function that doubles .. or triples, or timeses by anything we want.

```js
function makeFunctionThatTimesesByN( n ) {
  var newFunction = function(x) {
    return n*x
  }
  return newFunction
}

var double = makeFunctionThatTimesesByN(2)
// imagine what the inside of makeFunctionThatTimesesByN looks like:
  // var newFunction = function(x) {
  //   return 2*x                       // n = 2
  // }
  // return newFunction

double(15)
// => 30

var hexiply = makeFunctionThatTimesesByN(6)
hexiply(7)
// => 42


```

This is a wicked poweful trick for baking variables into functions, then passing that function around.
For example, we can bake custom callback functions with specific details baked into their recipe, then hand that callback into an async function.

#### Example

In terms of a pizza delivery analogy, the closure would be the "make a home delivery callback function" and the ingredient we would back in would be "persons address" :

Robin  places an order for a **Margherita**, and gives their address - **234 Aro Street**. Making pizza's is async, so We want to do something like this:

```js
fs.createPizza( 'margherita', deliverPizza )
```
But if deliverPizza is a callback ... that only takes `(err, pizza)` as arguments (where pizza is the result of a successful createPizza).

How do we get the address into the callback?!!

WE BAKE IT IN WITH A CLOSURE

```js
function makeCustomDeliveryCallback( address ) {
  var customDeliveryCallback = function( err, pizza ) {
    if (err) // do something!

    deliver( pizza, address )
  }
  return customDeliveryCallback
}

```

And use it like this:

```js
var deliverToRobin = makeCustomDeliveryCallback( '234 Aro Street' )
fs.createPizza( 'margherita', deliverToRobin )
```


Final note: typically closures are written more briefly :


```js
function makeCustomDeliveryCallback( address ) {
  return function( err, pizza ) {
    if (err) // do something!

    deliver( pizza, address )
  }
}

```

Check out this great article for more detail: https://developer.mozilla.org/en/docs/Web/JavaScript/Closures