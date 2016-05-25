When our users request a page in our app, their browser issues an HTTP GET request. When they submit a form in our app, the form's `method`, which is the HTTP method/verb our form should use, determines how their browser will send the form data to our server-side code. We can use the `get` method like this: 

```xml
<form action="http://foo.com/greetings" method="get">
  <input name="say" value="Hi">
  <input name="to" value="Mom">
  <button>Send my greetings</button>
</form>
```

This form will create this HTTP request:

```
GET /greetings?say=Hi&to=Mom HTTP/1.1
Host: foo.com
```

Notice how the form fields are appended to the URL as query parameters.

We can also use the `post` method like this:

```xml
<form action="http://foo.com/greetings" method="post">
  <input name="say" value="Hi">
  <input name="to" value="Mom">
  <button>Send my greetings</button>
</form>
```

This form will create this HTTP request:

```
POST /greetings HTTP/1.1
Host: foo.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

say=Hi&to=Mom
```

Notice how the form fields are sent in the body of the request.

> The `method` our forms use impact on how we extract the form fields from the request on the server-side. 

If we use `get`, we can extract the values using `req.query` like this:

```js
...
app.get('/greetings', function (req, res) {
  var greeting = req.query.say
  var recipient = req.query.to
  ...
})
...
```

If we use `post`, we must parse the body of the request. To do this, we need a couple more modules:

```js
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var parse = multer()
var app = express()

app.use(bodyParser.urlencoded({extended: true}))

...

app.get('/greetings', parse.array(), function (req, res) {
  var greeting = req.body.say
  var recipient = req.body.to
  ...
})
...
```

The `body-parser` module is Node.js middleware that parses the body of requests and `multer` uses `body-parser` to extract the parameters out of the requests and place them as properties on `req.body`. 
