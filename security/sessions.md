A [session](https://en.wikipedia.org/wiki/Session_(computer_science)) is a way our server can remember who a client is on repeated HTTP calls. If we didn't have sessions you would need to reenter your password every time you wanted to view a restricted page.

In Express, sessions are provided by [middleware](https://expressjs.com/en/guide/using-middleware.html). You can install it like so:

```shell
npm install express-session --save
```


### Session stores

Sessions have to be kept somewhere, so the server knows how to access them when a user visits the site. The default for `express-session` is an in-memory store (it keeps all the values in the server's RAM). This is strictly for development use! If it were used on a production server, not only would all the sessions vanish every time the server restarted, but the server would leak memory and become gradually slower and less responsive.

In most cases the session will be kept in a database table, or occasionally on the filesystem.


### Creating sessions

Like any other middleware, we tell Express to use it with the `use` function:

```js
app.use(expressSession({
  resave: false,
  secret: 'CHANGE THIS IN PRODUCTION!',
  saveUninitialized: false
}))
```

The above three config properties are the minimum required (otherwise you'll see deprecation warnings on startup). 

 - `resave` controls whether the session should be saved even if nothing changed (usually should be false)
 - `secret` provides a string value used to calculate the session _hash_: think of it a bit like the key that opens the session's lock
 - `saveUninitialized` controls whether the session will be saved if it's new and hasn't been changed (usually should be false)

Why 'CHANGE THIS IN PRODUCTION'? Well, normally a session secret would never be committed to source control: we'd load it from a `.env` file or come up with another way of generating it. It should be treated like a password, and probably changed on a regular basis.

If you find the session configuration confusing at first, you can use the above as a simple default while you're practicing with Express sessions.


### Using sessions

Sessions create an object on the request (`req.session`) which acts just like any other JavaScript object. You can save data to it:

```js
req.session.userID = 23
```

and read data from it:

```js
console.log(req.session.userID)
```

Authentication middleware like [Passport](https://passportjs.org) can make use of the session to store user IDs and can _deserialize_ users from the session: restore them to a JavaScript object that we can use.
