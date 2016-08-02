When we start out with Express, we often create routes that show static (unchanging) data, or we've used them to load and save from the filesystem. We can use a very similar layout to load and save data from a database using Knex.js.


### Promises

The main difference of course is that Knex functions return promises. We won't actually have any data to work with unless we wait for the promises to _resolve_ or _reject_. For example, this sort of thing won't work:

```js
function home (req, res) {
  var users = knex('users').select()
  res.send(users)
}
```

Instead, we'll need to make use of the `.then()` and `.catch()` functions to ensure that the data is available for us to use (and grab any errors that might occur):

```js
function home (req, res) {
  knex('users')
    .select()
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Couldn't show you the users!")
    })
}
```

### Extracting the database details to one place

Leaving details about database queries to clutter up your routes can be untidy.
Here's how you could extract them :

```js
// queries.js

var development = require('./knexfile').development
var knex = require('knex')(development)

function getUsers () {
  return knex('users').select()
}

function insertUser (userName) {
  return knex('users').insert({ name: userName})
}

module.exports = {
  getUsers: getUsers,
  insertUser: insertUser
}
```


```js
// app.js
// ... 

var queries = require('./queries')

app.get('/users', function (req, res) {
  return queries.getUsers()
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Can't display users!")
    })
})

app.post('/users', function (req, res) {
  var name = req.body.name  // name stored in a submitted form body
  
  return queries.insertUser(name)
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Couldn't insert a user.")
    })
})

```

### Exercise

This isn't a good implementation by any means! It's designed as a prompt to get you started. From here, can you figure out:

 * How to display users more sensibly in a Handlebars.js template?
 * How to add a user by submitting a form?
 * How to delete a user by name?
 * How to update a user's details?

You should also think about whether you really want direct references to Knex in your routes. Is there another way you could organise your code so that it's not so cluttered?

Create your own server, create a SQLite database using `knex init` and `knex migrate:make initial` (for example), and have a play.
