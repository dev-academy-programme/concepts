Previously, we've learnt to declare our routes directly within our `server.js` file:

```js
/*
 * server.js
 */

var express = require('express')

var PORT = 3000
var app = express()

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})

app.listen(PORT, function () {
  console.log('The server is listening on port', PORT)
})
```

However, as we add more routes to our Express server, this can become cumbersome. Express has built in functionality to separate our routes and make our code more modular:

### Express Router

We can use `express.Router` to create modular route handlers. The following example creates a router as a module, defines some routes, and mounts the router module on a path in the main app (`server.js`).

Let's say we want to create a `/birds` route where we can:
- view a list of birds via get `/birds`
- view a single bird by id via get `/birds/:id`
- add a new bird via post `/birds`

Our code may look like this:

```js
/*
 * server.js
 */

var express = require('express')
var birds = require('./birds')

var PORT = 3000
var app = express()

app.use('/birds', birds)

app.listen(PORT, function () {
  console.log('The server is listening on port', PORT)
})

/*
 * birds.js
 */

var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  // ...
})

router.get('/:id', function (req, res) {
  // ...
})

router.post('/', function (req, res) {
  // ...
})

module.exports = router
```

Notice the differences:

- `server.js`
  - We use `app.use` instead of `app.get` to add our routes to our server.
  - We put the name of the route `/birds` to specify that our `birds.js` will handle **ALL** routes that start with `/birds`.
  
- `birds.js`
  - Notice how we don't specify `birds` anywhere in this file? This is because we have already specified this in our `server.js`! This means that even though our first route is to `/`, it is **actually** `/birds` because we have prefixed the route in our server file.
  - We require in `express` and define a separate `var router = express.Router()` as a separate variable.
  - We specify `router.get` and `router.post` for the individual routes and these take in **two** parameters - a path `/` and a `req, res` callback function. 
  - We export the router, and not the individual functions.

