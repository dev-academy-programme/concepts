In Express, we often use [Passport](https://passportjs.org) to handle our authentication. Passport has been around since 2011, is widely used and has had a lot of scrutiny. This helps reassure us that we can trust it as part of our site's security.

To install Passport:

```shell
npm install passport --save
```

Like any middleware, we need to tell Express about Passport:

```js
app.use(passport.initialize())
```


### Strategies

Passport uses the concept of _strategies_ to implement authentication. A strategy is basically a plugin: some code that defines how to authenticate requests in a particular way. Many strategies already exist (more than 300, in fact) for a wide variety of situations, including the obvious (username and password, stored locally), the wildly popular (Facebook, Google, and Twitter strategies) and the slightly more obscure (like the [Fitbit](https://github.com/thegameofcode/passport-fitbit-oauth2) strategy).

Strategies are kept in separate npm packages, contributed by a wide variety of authors. We'll concern ourselves with the most common ones to begin with.


### Local strategy

Passport's `local-strategy` package is what most people think of when they think authentication: the user registers with a username and password, which we store on the server.

There are a number of steps involved in configuring Passport for this strategy:

 - we usually need to use forms which involves the `body-parser` package
 - we need to configure our sessions
 - if we're using flash messages, we have to tell Express

All of this ends up looking a bit like the following:

```js
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
  resave: false,
  secret: 'CHANGE THIS IN PRODUCTION!',
  saveUninitialized: false
}))
app.use(passport.session())
app.use(flash())
```

When the user logs in, Passport checks their password using a function that we provide during configuration:

```js
const localStrategy = require('passport-local')

passport.use(new localStrategy((username, password, done) => {
  knex('users')
    .select()
    .where('username', username)
    .then(users => {
      if (users.length === 0) {
        return done(null, false, { message: 'Unrecognised user.' })
      }

      const user = users[0]
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      done(null, user)
    })
    .catch(err => done(err, false, { message: 'Database error.' }))
}
```

There's quite a bit going on here:
 - The above suggests that passwords are being stored and compared in plain text (`user.password !== password`). This should never, ever happen! Normally passwords are stored in a [_hashed_](https://en.wikipedia.org/wiki/Cryptographic_hash_function#Password_verification) form.
 - Much of this would be abstracted out into other modules (particularly the database interaction).
 - The `done` callback is used by Passport to indicate whether authentication was successful or not:
   - if the second parameter contains a user object, authentication has succeeded
   - if the second parameter is `false`, authentication has failed
   - if the first parameter contains an error, something went wrong while trying to authenticate
   - the third parameter can be used to pass _flash messages_ which are stored in `req` and can be rendered to the view


### Serialise and deserialise

To avoid the user constantly having to log in when using local strategy, we use a session. Passport needs to be told how to:
 - _serialise_: put the user details in the session, often just an id
 - _deserialise_: retrieve the user details so we have a user object to get values from

Here's a simple example using Knex to retrieve the user object:

```js
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  knex('users')
    .select()
    .where('id', id)
    .then(users => {
      if (users.length === 0) {
        return done(null, false)
      }
      done(null, users[0])
    })
    .catch(err => done(err, false))
}
```

