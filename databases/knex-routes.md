When we start out with Express, we often create routes that show static (unchanging) data, or we've used them to load and save from the filesystem. We can use a very similar layout to load and save data from a database using Knex.js.


### Promises

The main difference of course is that Knex functions return promises. We won't actually have any data to work with unless we wait for the promises to _resolve_ or _reject_. For example, this sort of thing won't work:

```
function home (req, res) {
  var users = knex('users').select()
  res.send(users)
}
```

Instead, we'll need to make use of the `.then()` and `.catch()` functions to ensure that the data is available for us to use (and grab any errors that might occur):

```
function home (req, res) {
  knex('users')
    .select()
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      console.error(err.message)
      res.send("Couldn't show you the users!")
    })
}
```

### Plugging it in

Here's a rather braindead routes file that could provide you with some hints on getting database access up and running.

```
var development = require('./knexfile').development
var knex = require('knex')(development)

module.exports = {
  index: index,
  create: create
}

function index (req, res) {
  return getUsers()
    .then(function (data) {
      res.send(data)
    })
    .catch(function (err) {
      console.error(err.message)
      res.send("Can't display users!")
    })
}

function create (req, res) {
  return insertUser()
    .then(function () {
      res.send('Inserted a user.')
    })
    .catch(function (err) {
      console.error(err.message)
      res.send("Couldn't insert a user.")
    })
}

function getUsers () {
  return knex('users').select()
}

function insertUser () {
  return knex('users').insert({ name: 'Wombat' })
}
```

### Exercise

This isn't a good implementation by any means! It's designed to get you started. From here, can you figure out:

 * How to display users more sensibly in a Handlebars.js template?
 * How to add a user by submitting a form?
 * How to delete a user by name?
 * How to update a user's details?

You should also think about whether you really want direct references to knex in your routes. Is there another way you could organise your code so that it's not so cluttered?

Create your own server, create a SQLite database using `knex init` and `knex migrate:make initial` (for example), and have a play.
