It's important that tests are clear, and state exactly what you expect the code to do. Very often, a developer starting on a new project will look at the the tests of a codebase to understand what is going on. It's important that your tests are as clear as possible.

To enable this, it's common to write tests according to a simple formula. Each test should be made up of 3 distinct parts:

1. **Arrange**
2. **Act**
3. **Assert**

The *arrange* part represents the setup or context the code being tested needs in order for it to do what is expected of it. This part may be optional if there is no setup needed.

The *act* part performs an action using the function you are testing. This part will always be in the test.

Lastly, the *assert* part verifies the result (or behaviour) of the *act* matches what you expected. This uses a function that *asserts* an expectation: did we get the expected result, or something different? This part will also always be in the test.

Let's see an example:

```js
var test = require('tape')

test("can create a 2x2 matrix", function (t) {
  // arrange
  var expected = [[0,0], [0,0]]

  // act
  var result = makeEmptyMatrix(2)

  // assert
  t.deepEqual(result, expected)
  t.end()
})
```

Let's have another play with this by revisting our simple tape demo, {{ book.cohort }}tape-demo.

