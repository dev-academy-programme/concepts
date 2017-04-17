In earlier challenges we used `console.log` to assert whether our functions were working properly. This is acceptable in some situations, but quite restrictive. Luckily, lots of people have written lots of tools and modules to make testing a much easier experience.

One of these is a framework called Tape, which is pretty awesome, and relatively simple compared to other testing libraries.

Here's a basic Tape setup:

```js
var test = require('tape')

test("test some basic js", function (t) {
  t.true(2+2 === 4, "addition works")
  t.equal(3*3, 9, "multiplication works")

  var testArray = ['dave', 'sharon']
  testArray.push('flora')

  t.deepEqual(testArray, ['dave', 'sharon', 'flora'], "pushing to arrays works")

  t.end()
})
```

You'll probably want to improve the output of the test run with one of the recommended modules on the Tape website, for example `tap-diff` which turns tests red when they fail, and green when they pass. Remember, *red | green | refactor*!

Have a look at this [simple demo]({{ book.cohort }}tape-demo) of a Tape setup if you want to have a quick play yourself.
