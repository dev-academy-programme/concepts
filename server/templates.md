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


### Layouts and partials

One of the great things about using a templating engine is the ability to remove most of the HTML duplication from your web app. Layouts and partials are the feature that helps you do this. Layouts represent the structural part of each page. For example, if each of your pages had a header, a footer and navigation down the left side, you can define this structure in a layout file. Of course the main part of the page will depend on the route the user is navigating to. And this dynamic page needs to exist within the layout. Use `{{{body}}}` (that's right, 3 curly braces wrapping the word `body`) to specify where the rest of the page will go. Here is an example:

{% raw %}
```xml
<body>
  <header>...</header>
  <div class="left-nav">...</div>
  <div class="main-container">
    {{{body}}}
  </div>
  <footer>...</footer>
</body>
```
{% endraw %}

If you have some HTML that is repeated multiple times on a single page or throughout the app, the HTML can be placed within a partial and applied wherever it's needed. Using partials, you only need to make a change once, in the partial, and the change will take effect everywhere the partial is used. For example of how partials are used, consider this scenario. If you're showing a contact card for each user, you can define the markup of the contact card in a separate file and include it when you need it.

{% raw %}
```xml
<!-- contact-card.hbs -->
<div class="contact-card">
  <img src="{{imgUrl}}">
  <div class="name">{{name}}</div>
</div>

<!-- contacts.hbs -->
{{#each contacts}}
  {{> contact-card}}
{{/each}}
```
{% endraw %}

Partials are referenced based on their filename (without the file extension) and can be referenced from page templates, layouts or even other partials; pretty much from anywhere.


### Rendering with Express.js

Because integration with Express.js requires middleware, we'll use the `express-handlebars` npm package instead of the generic Handlebars package. In the following example, assume our data is coming from a module defined in `data.js`. It's `home` property contains an object for the `home` template.

```js
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')

var data = require('./data')

var app = express()

app.engine('hbs', hbs(
  extname: 'hbs',
  defaultLayout: 'main'
))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {
  res.render('home', data.home)
})
```

Notice how this uses `res.render` in our route to tell Express to use the Handlebars engine we registered for `*.handlebars` template files. We also told Express that our views are located in the `views` folder. Therefore, our `/` route is applying `data.home` to the template located at `views/home.handlebars`.

