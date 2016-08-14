Templates are combined with data, during a process called view _rendering_. This is done by a _template engine_ and there are a number of different template engines for every web framework (including Express.js). Each template engine has an associated template language that's used inside the view language, in our case HTML. The template language defines how to create placeholders that it can later replace with data during rendering. If a paint-by-numbers kit is metaphor for templates and data, rendering is painting and the template engine is the painter.

[Handlebars](http://handlebarsjs.com) is a popular templating library which evolved from another library called [Mustache](https://mustache.github.io). Both of these libraries boast being _logic-less_, meaning the template language doesn't encourage complex logic in the views. They do contain rudimentary conditionals and iterators, but lack a lot of features compared to other templating options. Other templating libraries offer a lot of language features and some provide the full capabilities of the JavaScript language. The authors of Handlebars/Mustache and many other developers consider the logic-less decision a feature. Their premise is the view should not contain complex logic and its data should be specific to the template. EDA tends to agree, so we'll use Handlebars. We choose Handlebars over Mustache because it has some nice composition features.

The placeholder syntax in Handlebars (and Mustache) looks like, well, mustaches! Each placeholder name is surrounded by {% raw %}  `{{ }}` {% endraw %} (double curly braces).

{% raw %}
```xml
<!-- index.hbs -->
<p>{{para}}</p>
```
{% endraw %}

```js
var data = {
  para: "Hi, I'm a paragraph."
}
```

In this example, `para` refers to a property on the `data` object used as the data applied by the template engine. The view that results from the rendering will be:

```xml
<p>Hi, I'm a paragraph.</p>
```

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


### Rendering with Express.js

Because integration with Express.js requires middleware, we'll use the `express-handlebars` npm package instead of the generic Handlebars package. In the following example, assume our data is coming from a module defined in `data.js`. It's `home` property contains an object for the `home` template.

```js
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')

var data = require('./data')

var app = express()

app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {
  res.render('home', data.home)
})

app.listen(3000, function () {
  console.log('Listening on 3000')
})
```

Notice how this uses `res.render` in our route to tell Express to use the Handlebars engine we registered for `*.hbs` template files. We also told Express that our views are located in the `views` folder. Therefore, our `/` route is applying `data.home` to the template located at `views/home.hbs`.

