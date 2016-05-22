Promises are a pattern/ style/ opinion about how to write synchronous functions.
They are a direct response to Callback Hell.

Here's an example of what a promisified superagent function looks like :

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

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
