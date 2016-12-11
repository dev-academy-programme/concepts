When we start out with Express, we often create routes that show static (unchanging) data, or we've used them to load and save from the filesystem. We can use a very similar layout to load and save data from a database using Knex.js.


### Promises

The main difference of course is that Knex functions return promises. We won't actually have any data to work with unless we wait for the promises to _resolve_ or _reject_. For example, this sort of thing won't work:

```js
app.get('/users', function (req, res) {
  var users = knex('users').select()
  res.send(users)
}
```

Instead, we'll need to make use of the `.then()` and `.catch()` functions to ensure that the data is available for us to use (and grab any errors that might occur):

```js
app.get('/users', function (req, res) {
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

Following the [Single Responsibily Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), it's much cleaner to have the routes focus on the request and response and extract the details of database access into a separate module. Here's how you could extract them:

```js
// queries.js

var development = require('./knexfile').development
var knex = require('knex')(development)

function getUsers () {
  return knex('users').select()
}

// An example user object: {name: 'feroze', email: 'feroze@gmail.com'}
function insertUser (user) {
  return knex('users').insert(user)
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
  queries.getUsers()
    .then(function (users) {
      res.send(users)
    })
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Can't display users!")
    })
})

app.post('/users', function (req, res) {
  var newUser = {
    name:  req.body.name,  // name stored in a submitted form body
    email: req.body.email
  }
  
  queries.insertUser(newUser)
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Couldn't insert a new user.")
    })
})
```
