Templates are often compiled before the data is applied. The compilation of a template usually results in a function that accepts a single input and returns HTML. This is great from a testing perspective because we can test the result given a known input. For client-side rendering, we can either perform this in the browser or directly in the terminal.

```js
var test = require('tape')
var cheerio = require('cheerio')

test('test the greeting template', function (t) {
  var template = require('../views/greeting.js')

  var result = template({name: 'Benedict'})

  var $ = cheerio.load(result.outerHTML)
  t.equal($('h1').text(), 'Welcome Benedict!')
  t.end()
})
```
