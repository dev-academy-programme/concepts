A _callback_ is a function we pass to another function as a parameter. When the receiving function wants to send something _back_ to the first function, it _calls_ the callback.

Remember `Array.map()`? It takes a callback function as a parameter:

```js
// Returns [2, 3, 4]
[1, 2, 3].map(function (n) {
  return n + 1
})
```

The anonymous function passed to `map` is called by `map`: we don't call it ourselves, we just tell it what to do once it gets called. This is a very common pattern in functional programming.


## "Hello, Metaphorical Pizza?"

We often use callbacks when working with _asynchronous functions_. An async function will go off and do its work, then call the callback you passed to it when it has some results to give you (or an error to report). In the meantime, the rest of your program continues on its merry way, not waiting for the operation to complete.

Say you're hungry, and you order a pizza. You don't know ahead of time how long the pizza is going to take to arrive (30 min guarantees notwithstanding) and you're certainly not going to stand there doing nothing while you wait. You go on doing whatever you were doing, but you've provided your address to the pizza place so that when your order is ready, they can deliver it to you. They can also report an error: "We ran out of anchovies", or "The oven exploded".

```js
function deliver(err, pizza) {
  if (!err) {
    answerTheDoor()
    payFor(pizza)
    enjoy(pizza)
  }
}

orderAPizza('pepperoni', deliver)
makeCoffee()
callFriends()
```

In this example, `deliver` is a function being used as a callback. We immediately go on to doing other things after we've called `orderAPizza`, and the code inside the callback will only execute when the pizza place calls `deliver(null, pizza)`. (See below for why we used `null` here.)

Async functions might take a little getting used to in the beginning, but you'll use them a _lot_ in your JavaScript programming and they will become second nature.


## Reading from a file

Node programs often pass callback functions that handle the data you expect to receive from APIs, from databases, or from the filesystem. The filesystem is an easily accessible way of practicing this technique.

```js
var fs = require('fs')

fs.readFile('animals.txt', 'utf8', function (err, animals) {
  if (err) {
    console.error("Couldn't read file:", err.message)
  } else {
    console.log(animals)
  }
})
```

This program reads a file from the directory in which it was run, and outputs the result to the terminal. Try it! When you're done, try modifying the string `'animals.txt'` to a filename you know _doesn't_ exist, and run the program again. You should see an error that Node can't open the file you asked for.

The first thing to notice about this example is that everything interesting happens _inside the callback_. Remember, we're not making things happen ourselves: we're _defining_ what _will_ happen once `readFile` has finished its work: once it has either succeeded or failed to deliver the contents of the file.

The next thing to notice is that the callback has a very particular structure. It's an _error-first callback_, a common convention in the Node world which assumes that the first parameter of the callback will always be either an error object or `null`. We should always check the error to make certain it's `null` before we try to use the `animals` parameter.

This is a really common pattern in JavaScript programs. You'll be seeing it a lot, so get some practice in!


## Named callbacks

The callback doesn't have to be an anonymous function. It's often better to use a named function, both because it can be re-used and because it can be more readable:

```js
fs.readFile('birds.txt', 'utf8', displayFileContents)
fs.readFile('trees.txt', 'utf8', displayFileContents)

function displayFileContents (err, contents) {
  if (err) {
    console.error("Couldn't read file:", err.message)
  } else {
    console.log(contents)
  }
})
```

Right away this makes our code a bit more DRY. We have to do the same thing with both files so why write the function twice? It can also make the code easier to debug since we only have to look in one location for the problem.

