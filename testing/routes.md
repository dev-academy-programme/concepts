We can test server routes using [Supertest](https://github.com/visionmedia/supertest) and [tape](https://github.com/substack/tape).


### Setting up

We do this first and foremost by _exporting_ the Express `app` object from `server.js` (or wherever it happens to be defined):

```
// server.js
var app = express()

app.get('/example', function (req, res) {
  res.send('WOMBAT')
})

module.exports = app
```

Importantly, we want to put the `app.listen()` call in another file (`index.js`, for example). This allows our testing code to `require('./server.js')`. If we put the `.listen()` call in `server.js`, it will execute when the file is read and we don't actually want the server listening for connections while we're running our tests. This implies that we can tell things about our application without running it at all! Handy.

`index.js` can be pretty simple:

```
// index.js

var app = require('./server')
var PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log('Server listening on port: ', PORT)
})
```


### Writing route tests

By convention, Supertest is usually called from the variable name `request`.

```js
var request = require('supertest')
var test = require('tape')
 
var app = require('../server.js')

test('/example returns WOMBAT', function (t) {
  // Arrange
  var expected = 'WOMBAT'

  // Act
  request(app)
    .get('/example')
    .end(function (err, res) {
      // Assert
      t.error(err)
      t.equal(res.text, expected)
      t.end()
    })
})
```

Notice that we put our assertion inside a callback (the anonymous function passed to `.end`). Supertest will give us the response from the server here, or any error messages... this is a standard Node _error-first callback_. Supertest calls it for us when it's done requesting the `/example` route from our server.

The `text/html` content sent back in the response can be found in the `res.text` property.

In pseudocode, we might write:

```
SEND a request to the /example route
WAIT for a response
WHEN the response comes,
    COMPARE it with what we expected it to be
```

We can check more than just simple text returned from a route. We can test to see if there was an error, for example:

```
  request(app)
    .get('/example')
    .end(function (err, res) {
      // Test fails if there's an error
      t.error(err)
      t.equal(res.text, expected)
      t.end()
    })
```

We can also check what the HTTP status code was that the server sent back (for example, 200 for _OK_ or 404 for _NOT FOUND_):

```
  request(app)
    .get('/example')
    .expect(200)
```


### HTML

We can use the [cheerio](https://github.com/cheeriojs/cheerio) library to test the HTML that gets sent back in a route response. cheerio can be used almost exactly like jQuery to select elements. Here's an example:

```
var cheerio = require('cheerio')
var request = require('supertest')
var test = require('tape')

var app = require('../../server.js')

test('/html-example has exactly one paragraph tag', function (t) {
  // Arrange
  var expected = 1

  // Act
  request(app)
    .get('/html-example')
    .expect('Content-Type', /html/)
    .end(function (err, res) {
      // First, we need to initialise cheerio with the HTML that was returned from our route
      var $ = cheerio.load(res.text)

      // Next, we get the array of all paragraph tags found in that response, and check its length.
      // The syntax is identical to jQuery checking the `document` object in a browser.
      var actual = $('p').length

      // Assert
      t.equal(actual, expected)
      t.end()
    })
})
```

Of course, we can use cheerio to make much more complicated assertions. However, try to keep your tests from becoming too pedantic about what is returned from a route.

> "Tell me, are there three question marks at the end of the third sentence in the fourth paragraph of the splash page?"

What happens if that text gets changed during an update? Your tests will fail for no particularly good reason. Testing HTML output can tell us whether our template is rendering correctly, but it should be used in moderation.

