### Manual rendering

To see how to use the template engine, we'll first do this outside of Express by using only JavaScript, Node.js and the `handlebars` npm package.

{% raw %}
```js
var handlebars = require('handlebars')

var simpleTemplate = '<p>{{para}}</p>'
var createSimpleResult = handlebars.compile(simpleTemplate)
var simpleResult = createSimpleResult(data)

console.log(simpleResult)
```
{% endraw %}

Notice how the `compile` step returns a function that accepts the data to apply to the template. How about the conditionals and iterations that was mentioned earlier?

{% raw %}
```js
var handlebars = require('handlebars')

var data = {
  trueBool: true,
  cool: 'okay, this is cool',
  colours: ['red', 'green', 'blue'],
  obj: {
    prop: 'nested object property'
  }
}

// conditional
var conditionalTemplate = '<p>' +
  '{{#if trueBool}}' +
  'truthy :)' +
  '{{else}}' +
  'falsey :(' +
  '{{/if}}' +
  '</p>'
var createConditionalResult = handlebars.compile(conditionalTemplate)
var conditionalResult = createConditionalResult(data)
console.log(conditionalResult)

// iterator
var iteratorTemplate = '<ul>\n' +
  '{{#each colours}}' +
  '  <li>{{this}}</li>\n' +
  '{{/each}}' +
  '</ul>'
var createIteratorResult = handlebars.compile(iteratorTemplate)
var iteratorResult = createIteratorResult(data)
console.log(iteratorResult)

// nested objects
var nestedTemplate = '<p>{{obj.prop}}</p>'
var createNestedResult = handlebars.compile(nestedTemplate)
var nestedResult = createNestedResult(data)
console.log(nestedResult)
```
{% endraw %}

In the iterator example, because we want to output the current item of the array, and it isn't named, we simply refer to it as `this`. While the syntax of the template doesn't change, the way we invoke the template engine is much easier when we're using Express.js.



