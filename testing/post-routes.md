We can send 'fake' data to our POST routes to check that the response is what we expect.

We _could_ do this manually, by entering data into a form on a browser. However, we don't need to do this and it's probably better not to. We want to test in a way that's _automated_ and _repeatable_. We'll use [Supertest](https://github.com/visionmedia/supertest) to do our POST route testing.

> Strictly speaking, this kind of test is not a _unit test_: we are testing our server, starting from the point where it receives a request to the moment it sends a response back to the client. You will hear people call this kind of test different names, but one common one is _end to end testing_. E2E tests involve more than one 'unit' of code, and they often follow the same path as a user making a request from the browser... we're just skipping the browser part!

### Example

Say we have a route that renders a Handlebars template and returns HTML confirming the form submission. We could test this like so:

```js
var test = require('tape')
var request = require('supertest')
var cheerio = require('cheerio')

test("POST / returns confirmation including name", function (t) {
  // Arrange
  var formData = {
    name: 'flargle',
    address: '1 Flargle Lane'
  }
  var expected = 'Your submission was accepted, ' + formData.name

  // Act
  request(app)
    .post('/')
    .type('form')
    .send(formData)
    .end(function (err, res) {
      var $ = cheerio.load(res.text)
      var actual = $('body').html()

      // Assert
      t.error(err)
      t.ok(actual.includes(expected))
      t.end()
    })
})
```

There's quite a bit going on in this example! Let's break down some of the major points to note:

 - We use `request.post` to specify the route we wish to test
 - We use `request.type` to specify that the data we're sending is a form
 - We use `request.send` to send the data, which Supertest will automatically convert to form fields
 - We only do our _assertions_ in the callback (the function passed to `request.end`. This is a test for _asynchronous_ code, so we need to wait for it to call the callback before we check any values.

We use [cheerio](https://github.com/cheeriojs/cheerio) because the route is sending back HTML, and cheerio makes it easier to find the values we're looking for. Obviously, this wouldn't work so well if the route sent us a JSON or plain text response.

Notice also that we're using the JavaScript string prototype function `.includes`, which returns a boolean. This is because the template often will contain extraneous characters like newlines and white space, which we're not really interested in but might make our test fail. For example:

```shell
    ✖ should be equal
    ------------------
      operator: equal
      expected: 'Your submission was accepted, flargle'
      actual:   '\n    Your submission was accepted, flargle\n  '
```

The route is obviously doing what it's told, but strictly speaking the text is different so the test will not pass. We could also `.trim` the string.

