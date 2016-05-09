A [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a special object that represents an asynchronous operation expected to complete in the future. Using Promises is a common strategy for controlling the flow of a series of asynchronous operations. 

## Using Promises for Control Flow

When **functions return Promises** we can chain such functions together, passing the results of one operation on to the next using the `.then()` syntax in a readable high-level format. 

A sequence of three promise returning functions might look like this:

```js
firstAsyncOperation(params)
  .then(secondAsyncOperation)
  .then(thirdAsyncOperation)
  .catch(onError)

```

This gives us a concise, high-level view of an asynchronous flow.

Compare this to using nested anonymous callbacks which often creep across the page:

```js
firstAsyncOperation(params, function (err, result1) {
  secondAsyncOperation(result1, function (err, result2) {
    thirdAsyncOperation(result2, fucntion (err, result3) {

    })
  })
})
```
## Promise methods

Promise objects have two important methods: `.then()` and  `.catch()`. In the following code `myAsyncFuntion` returns a `promise`. 

```js
var myPromise = myAsyncFunction()

myPromise.then(function (result) {
  // result is the result of myAsyncFuntion

})

myPromise.catch(function (err) {
  // err is any error from myAsyncFunction
})

```
We usually leverage this aspect to "chain" the operations. As long as the function **returns a promise** we can keep chaining our operatons like so :

```js
myAsyncFunction()
  .then(function (result1) {
    return secondAsyncFunction(result1)
  })
  .then(function() {
    console.log('both operations are complete!)
  })
  .catch(function (err) {
    // any error from myAsyncFunction or secondAsyncFunction propagates here
  })

```

## Promise strategies



Here's an example of a a promisified superagent what they look like :

```js
var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

request.get('http://google.com')
  .then(function onResult(res) {
    // do stuff
  })
  .catch(function onError(err) {
    //err.response has the response from the server
  });


```
from : https://www.npmjs.com/package/superagent-promise


Here's a more 'nested' example of Promises, which also using `Promise.denodeify` to convert callback-style async functions into promise-style async functions:

```js
var Promise = require('promise')
var fs = require('fs')

var promiseRead = Promise.denodeify( fs.readFile )
var promiseWrite = Promise.denodeify( fs.writeFile )

promiseRead( './package.json', 'utf8' )
  .then( function(results) {
    return results.toUpperCase()
    // this is synchronous so doesn't need to be on its own line
    // mainly a demonstration of how you can write functions which just do simple things and return to next .then
  })
  .then( function(results) {
    return promiseWrite('./caps_output', results)
    // fs.writeFile is a funny method, it's an exception which just
  })
  .then( function(results) {
    return promiseRead('./caps_output', 'utf8')
  })
  .then( function(results) {
    console.log(results)
  })
  .catch( function(err) { console.log("oh nose") }  )
```


