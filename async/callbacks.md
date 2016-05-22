A _callback_ is a function we want a different function to call, so we pass it as a parameter. How about a delicious metaphor? When you call a pizza joint and order a pizza, it's an asynchronous function and it takes two arguments: 

1. The kind of pizza to make
2. What to do with the order once it's ready

```js
pizzaJoint.getPizza('margherita', deliver)
```

In this example, `deliver` (our instructions) is a callback that we want called after the pizza has been made. When `getPizza` has finished making a margherita, it calls the `deliver` function (or `leaveForPickup`), and it will call it with 2 parameters:

1. An error object (`err`) if something went wrong (such as running out of basil), or `null` if everything was fine.
2. The result of the asynchronous call. In our case, the `pizza`.

This means `deliver` is defined like this:

```js
function deliver(err, pizza) {
  if (!err) {
    answerTheDoor()
    payFor(pizza)
    enjoy(pizza)
  }
}
```

The example above uses a _named function_ called `deliver`. It's also common to use an _anonymous function_ as a parameter like this:

```js
pizzaJoint.getPizza('margherita', function (err, pizza) {
  if (!err) {
    answerTheDoor()
    payFor(pizza)
    enjoy(pizza)
  }
})
```

While inline anonymous functions (above) are common, using named functions (like we did with `deliver`) makes your code more readable and easier to debug.

It's important to understand that just because a function accepts a callback does not _make_ it asynchronous. Callbacks are just _one_ way of working with async functions. In the absense of an _actual_ async operation, callbacks are synchronous, as we can see with [`Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). With that said, Node.js has adopted a convention whereby only its async functions accept error-first callbacks, such as our `deliver` function above. You can see this in the Node.js filesystem module (`fs`).

`fs` provides synchronous and asynchronous functions for reading files:

* `fs.readFileSync(completePathToFile)`
* `fs.readFile(completePathToFile, callback)`

Notice how the synchronous version (`readFileSync`) doesn't accept a callback, but the async version (`readFile`) does. It's important to use callbacks consistently in your code and Node.js provides a great example to follow.

For more information about `fs`, check out the docs at https://nodejs.org/api/fs.html.


