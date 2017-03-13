We can write tests for code that touches a database in a similar way to testing for any other asynchronous function, but there is some infrastructure that makes writing such tests a little easier.


## A note on AVA

The following examples use [AVA](https://github.com/avajs/ava). The same thing can be done with tape, but some of AVA's behaviour makes testing with databases a little easier. AVA assertions are almost exactly the same as tape, except that `t.equals` becomes `t.is`, and there's no need to call `t.end()`.


## The test database

We don't want to test on our live database! Imagine if we deleted someone's user record while we were testing, or even dropped the entire users table... badness would ensue. We don't even want to test with a _copy_ of the live database. What we want is a simple database that is entirely predictable: in other words, we know exactly what's in it, and we can run tests on it over and over without it changing.

Another trick: ideally, we want our test database to be an _in-memory_ database. This database will only last as long as our tests, and vanishes in a puff of smoke afterwards. Because it is in memory and not on the filesystem, it works extremely quickly and is not vulnerable to any problems that might occur with the filesystem (hard disk full or busy, permissions problems with directories, etc).

We can create such a creature using SQLite3, by adding a `test` property to our `knexfile.js`:

```js
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    seeds: {
      filename: './tests/helper/seeds'
    }
  }
```

The `seeds` property might be new to you: the ordinary seeds will still run when we execute `npm run knex seed:run`. However, when we're using the `test` config the specified directory above will be used instead. This lets us isolate our seeds and provide very specific values just for the tests.


## The test file

Here's some infrastructure for our database tests:

```js
var test = require('ava')
var knex = require('knex')

// Notice that we require the `.test` property from the knexfile
var config = require('../knexfile').test

// Create a separate in-memory database before each test.
test.beforeEach(function (t) {
  t.context.db = knex(config)
  return t.context.db.migrate.latest()
    .then(function () {
      return t.context.db.seed.run('test')
    })
})

// Destroy the database connection after each test.
test.afterEach(function (t) {
  t.context.db.destroy()
})
```

All this is to ensure that each individual test file works with its own test database: they are isolated from each other. The database can be accessed in the _context_ object provided to each test, as `t.context.db`. If you don't quite understand the details of the above code, think of it like this:

```
BEFORE each test,
  MIGRATE new database
  SEED database

AFTER each test,
  DESTROY database
```


## The tests

After all that, testing database code becomes much like testing any other async function: we have to put the assertions _inside_ the `.then()` function (or the callback, if using callback-based code).

```js
var getAllThings = require('./getAllThings')

test('getAll returns three things', function (t) {
  // Arrange
  var expected = 3

  // Act
  // Be sure to always use `return` when testing with promises
  return getAllThings(t.context.db)
    .then(function (results) {
      var actual = results.length

      // Assert
      t.is(actual, expected)
    })
})
```

Here, we know ahead of time that our test database has three rows in its `things` table, and because we use a fresh copy of the database for each test, we can rely on that to always be true. This allows us to _assert_ that the array returned by our function ought to have a `length` of exactly 3.

Here's a slightly more complicated example. In it, we go back to our in-memory database and _check_ to be sure that our function did the right thing:

```js
test('deleteThing removes the correct thing', function (t) {
  var id = 2
  var expected = 0

  return deleteThing(id, t.context.db)
    .then(function () { return t.context.db('things').where('id', id).select() })
    .then(function (results) {
      var actual = results.length
      t.is(actual, expected)
    })
})
```

Translated: when the promise returned by our `deleteThing` function resolves, the `thing` we wanted to delete should be gone from the database. In other words, there should be no results from a query on its `id`.

One more:

```js
test('updateThing alters the name field', function (t) {
  var id = 2
  var expected = 'Aardvark'

  return updateThing(id, expected, t.context.db)
    .then(function () { return t.context.db('things').where('id', id).select() })
    .then(function (results) {
      var actual = results[0].name
      t.is(actual, expected)
    })
})
```

Translated: when the promise returned by our `updateThing` function resolves, the `thing` we wanted to update should have had its name property changed to what we passed in as an argument.


## Writing testable code

You might have noticed that the functions being tested in the above examples all accepted the database connection (`t.context.db`) as a parameter. That's because to make a function easy to test, sometimes we need to think carefully about the way the function is written. For database testing we need to do a couple of things:

 - _export_ the function, so that it can be seen outside of the module it's a part of
   - this is no different to testing any other function
 - _pass the database connection_ into it, so that we can give it either the real database or a temporary test database
   - this is a very simple form of a concept called [_dependency injection_](http://stackoverflow.com/a/130862/122643)

The code for the second part might be an unfamiliar concept. Take a look at this:

```js
var config = require('./knexfile').development
var db = require('knex')(config)

// ...

// If `testDb` is undefined, use `db`
function getAll (testDb) {
  var connection = testDb || db
  return connection('things').select()
}
```

See what we did there?  We could pseudocode this as:

```
USING testDb OR db,
  GET all the things
```

Another way of managing this is to always pass the database connection to the function. It doesn't care where it comes from!

```js
function getAll (connection) {
  return connection('things')
    .select()
}

function addThing (thing, connection) {
  return connection('things')
    .insert(thing)
}
```

