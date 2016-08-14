[Supertest](https://www.npmjs.com/package/supertest) is a great way to test APIs. The way you use it is quite similar to [Superagent](https://www.npmjs.com/package/superagent).

Here's some example usage, which incorporates tape.

```js
var request = require('supertest')
var test = require('tape')
 
var app = require('../app.js')

test('/users route returns an object containing an array of users', function (t) {
  // Arrange
  var expected = true

  // Act
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      // Assert
      t.equal(err, null)
      t.equal(Array.isArray(res.body.users), expected)
      t.end()
    })
})

// Close any open connections
test.onFinish(function () {
  process.exit(0)
})
```

Here Supertest is using its API testing tools (`expect`) to check the headers and HTTP status code it receives from its GET request to `/users`. It gives us the response to test in `.end()`. The test checks several things: first, that no error was returned; second, that there is a property named `users` on the response body, and that it is an array.

We can't test the exact content being returned from the route because it could be different each time. We'd have to have the exact same database records every time we ran the test to ensure predictable behaviour. Tests that examine a route in this way are often referred to as _integration tests_, because they use multiple parts of the system (the database, network and filesystem in particular) which are not [mocked](https://en.wikipedia.org/wiki/Mock_object#Use_in_test-driven_development).
