A _callback_ is a function we pass to another function as a parameter. When the receiving function wants to send something _back_ to the first function, it _calls_ the callback.

Remember `Array.map()`? It takes a callback function as a parameter:

```js
// Returns [2, 3, 4]
[1, 2, 3].map(function (n) {
  return n + 1
})
```

The anonymous function passed to `map` is called by `map`: we don't call it ourselves, we just tell it what to do once it gets called. This is a very common pattern in functional programming.


## The filesystem

One of the main reason we use callbacks is when working with _asynchronous functions_. An async function will go off and do its work, then call the callback you passed to it when it has some results to give you (or an error to report). In the meantime, the rest of your program continues on its merry way, not waiting for the operation to complete.

During Phase 0 you worked with async functions when you completed the API Interaction assignment, but you might not have realised it at the time! You called a function that retrieved information from a translation or quotes API, then when the information was available jQuery called its callback for you. When working with Node, you'll often be passing callback functions that handle the data you expect to receive from APIs, from databases, or from the filesystem. The filesystem is an easily accessible way of practicing this technique.

Async functions might take a little getting used to in the beginning, but you'll use them a _lot_ in your JavaScript programming and they will become second nature.


## Reading from a file

```js
var fs = require('fs')

fs.readFile('animals.txt', 'utf8', function (err, data) {
  if (err) {
    console.error("Couldn't read file:", err.message)
  } else {
    console.log(data)
  }
})
```

This program reads a file from the directory in which it was run, and outputs the result to the terminal. Try it! When you're done, try modifying the string `'animals.txt'` to a filename you know _doesn't_ exist, and run the program again. You should see an error that Node can't open the file you asked for.

The first thing to notice about this example is that everything interesting happens _inside the callback_. Remember, we're not making things happen ourselves: we're _defining_ what _will_ happen once `readFile` has finished its work: once it has either succeeded or failed to deliver the contents of the file.

The next thing to notice is that the callback has a very particular structure. It's an _error-first callback_, a common convention in the Node world which assumes that the first parameter of the callback will always be either an error object or `null`. We should always check the error to make certain it's `null` before we try to use the `data` parameter.


## Callbacks in routes

What would that look like in an Express route? Let's say we had to read a file in order to send the right response back to the user:

```js
app.get('/users', function (req, res) {
  // ...
})
```

Well, before we get started, take a look at that: routes already use callbacks! We pass a function into `app.get` as the second argument. When it's ready, it will call it for us and provide us with the `req` and `res` parameters. So we've been using callbacks anyway without really thinking about it.

```js
app.get('/users', function (req, res) {
  fs.readFile('users.txt', 'utf8', function (err, data) {
    if (err) {
      res.sendStatus(500)
      return
    }
    res.send(data)
  })
})
```

Notice again that everything happens _inside_ the callback passed to `readFile` (which, if you want to get technical, is inside the callback passed to `app.get`)!

1. First, we check for an error.
2. If there's an error, we send a status 500 (server error) which reports a problem with the server.
3. Otherwise, we send back the data we got from the file.

This is a really common pattern in JavaScript programs. You'll be seeing it a lot, so get some practice in!
