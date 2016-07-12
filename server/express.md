Express is a minimalist web framework for Node.js. Express makes it easy to create server-side web applications by providing an easy way to read and manipulate the HTTP requests and responses.


### Responding with a string

Responding to a client request is often just a matter of using the `res` parameter. This is a Node.js response object that is provided through Express. The following is a simple web server that only responds with "Hello world" when a `GET` request is made to the root of the application, which is listening on port 3000.

```js
// server.js
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

To see this in action, start the server by running `node server` in your terminal, and visit http://localhost:3000 in your browser. You can also run `curl http://localhost:3000` in another terminal tab or window.

The `app.get()` call allows us to define endpoints, also called routes, such as `/`. The server will only to respond to routes our application defines. Attempts at any other endpoint will respond with a `404 File not found`. If you start the server and run `curl http://localhost:3000/foo` in your terminal, you should see `Cannot GET /foo`.


### Separation of concerns

Because the routes are the only bit of code (so far) that isn't related to running the server, we should put them in their own file so we can test them.

```js
/*
 * server.js
 */

var express = require('express')
var routes = require('./routes')

var PORT = 3000
var app = express()

app.get('/', routes.index)

app.listen(PORT, function () {
  console.log('The server is listening on port', PORT)
})

/*
 * routes.js
 */

module.exports = {
  index: index
}

function index (req, res) {
  res.send('<h1>Hello world</h1>')
}

/*
 * routes-tests.js
 */

var test = require('tape')
var routes = require('./routes')

test('routes.index responds with Hello world', function (t) {
  var res = { send: send }

  routes.index(null, res)

  function send (msg) {
    t.equals(msg, '<h1>Hello world</h1>')
    t.end()
  }
})
```


### Responding with a file

Rather than responding to a request with an HTML string, we may have an HTML file prepared to send. We can easily send that file using the `sendFile` method.

```js
/*
 * server.js
 */

...
var routes = require('./routes')
app.get('/home', routes.home)
...

/*
 * routes.js
 */

module.exports = {
  home: home
}

function home (req, res) {
  res.sendFile(__dirname + '/index.html')
}

/*
 * routes-tests.js
 */

var test = require('tape')
var routes = require('./routes')

test('routes.home responds with index.html', function (t) {
  var res = { sendFile: sendFile }

  routes.index(null, res)

  function sendFile (file) {
    t.equals(file, 'index.html')
    t.end()
  }
})
```

In the route, `__dirname` is a global Node.js object that refers to the name of the folder for the currently executing script.


### Accepting query parameters

One of the ways we can send data from the client to the server is to send name/value pairs in the URL, for example `http://localhost:3000?name=value`. Our application can retrieve these values from the `req.query` object. The following example sends a value it has received back in the response.

```js
/*
 * server.js
 */

...
var routes = require('./routes')
app.get('/webapps', routes.webapps)
...

/*
 * routes.js
 */

module.exports = {
  webapps: webapps
}

function webapps (req, res) {
  res.send(req.query.name + ' is building web apps')
}

/*
 * routes-tests.js
 */

var test = require('tape')
var routes = require('./routes')

test('routes.webapps response includes a querystring parameter', function (t) {
  var res = { send: send }
  var req = { query: { name: 'Robin' } }

  routes.webapps(req, res)

  function send (msg) {
    t.equals(msg, 'Robin is building web apps')
    t.end()
  }
})
```

You can see this route work by starting the server and running `curl http://localhost:3000/webapps?name=Robin` in your terminal.


### Saving data to server memory

Express provides the object `app.locals` that we can use to store data on the server. 

```js
/*
 * server.js
 */

var express = require('express')
var routes = require('./routes')
var app = express()

app.get('/add', routes.add)
app.get('/answer', routes.answer)
...

/*
 * routes.js
 */

module.exports = {
  add: add,
  answer: answer
}

function add (req, res) {
  req.app.locals.op1 = parseInt(req.query.op1, 10)
  req.app.locals.op2 = parseInt(req.query.op2, 10)
  res.send('Got it. <a href="/answer">Is this the answer?</a>')
}

function answer (req, res) {
  var result = req.app.locals.op1 + req.app.locals.op2
  res.send('I hope you are expecting ' + result)
}

/*
 * routes-tests.js
 */

var test = require('tape')
var routes = require('./routes')

test('routes.add saves numeric operands on the server', function (t) {
  var res = { send: function () {} }
  var req = { 
    query: { 
      op1: '11', 
      op2: '22'
    }, 
    app: {
      locals: {} 
    }
  }

  routes.add(req, res)

  t.equals(req.app.locals.op1, 11)
  t.equals(req.app.locals.op2, 22)
  t.end()
})
```

Express is capable of much more than we're showing here, but this is enough to get us started. We'll continue to explore more of what Express has to offer, such as static files, view template rendering, and its middleware pipeline, in the near future.

