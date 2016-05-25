Let's say we want to test and write an asynchronous function `readJson`, which given a path to a JSON file returns the object represented by the file.

Our initial approach might look something like:

```js
test('reads a json file', function (t) {
  var path = __dirname + '/data.json'
  var object = readJson(path)
  t.ok(object)
  t.end()
})
```

However if we read our file asynchronously with `fs.readFile`, it's impossible for `readJson` to return synchronously. This is because `fs.readFile` is async: the filesystem read takes time and subsequent lines of code will be run before the contents of the file are ready to be used.

In synchronous code

* to send data to the caller we use `return data`.
* to send an error to the caller we use `throw err`.

In asynchronous code

* to send data to the caller we use `callback(null, data)`.
* to send an error to the caller we use `callback(err)`.

This means `readJson` must also take a callback!

Let's try again:

```js
test('reads a json file', function (t) {
  var path = __dirname + '/data.json'
  readJson(path, function (err, object) {
    t.error(err)
    t.ok(object)
    t.end()
  })
})
```

