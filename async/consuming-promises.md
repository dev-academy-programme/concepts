Promises are another approach to asynchronous programming - one which conveniently allows us to sidestep callback-hell.

They let you call an asynchronous command, and pass on a promise which is **then** _resolved_ later.
If that promise can't be kept (something is _rejected_), then we can **catch** the error and deal with it.

## `then` and `catch`

```js
getDataFromServer()
  .then(doSomethingWithData)
  .catch(handleError)
```
This example is about as simple as it gets. We don't need to understand the exact details of how to return a promise in order to use `getDataFromServer`. We just need to expect that:

1. The `then` function will call `doSomethingWithData` if there is no error. `doSomethingWithData` can be passed a value.
2. The `catch` function will call `handleError` if there is an error, and `handleError` will be passed an error (often a JavaScript `Error` object).

It may be helpful to see the same code again using inline anonymous functions (though we should still try to use named functions for clarity):
```js
getDataFromServer()
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) {
    console.error(err)
  })
```
If `getDataFromServer` returns a _resolved_ promise, `then` will be called (and `catch` won't be). If it returns a _rejected_ promise, `catch` will be called (and `then` won't be).

If you are familiar with callbacks, you'll notice it's like a callback that has had the `err` and the `data` handling parts seperated.
The same thing might be written like this with callbacks: 

```js
getDataFromServer( function(err, data) {
  if (err) throw(err)
  
  console.log(data)
})
```

## Promise chains

We can also string together quite long 'promise chains' which define the order certain tasks should occur in:

```js
getDataFromServer()
  .then(checkTheData)
  .then(displayTheData)
  .then(modifyTheData)
  .then(saveTheData)
  .catch(handleError)
```
So long as each function in the chain returns a data object, this will help ensure everything takes place in the correct order. For example, `modifyTheData` would not be called before `checkTheData`.

## Knex.js

We can see this being put to work with the Knex library when accessing a database. A simple example: inserting a row, then querying the table and displaying the results.
```js
knex.insert({
    name: 'Daisy',
    age: 15
  })
  .into('dogs')
  .then(getNames)
  .then(showNames)
  .catch(displayError)

function getNames () {
  return knex('dogs').select('dogs.name')
}

function showNames (names) {
  console.log(names)
}

function displayError (err) {
  console.error(err)
}
```
