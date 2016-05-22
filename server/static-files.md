Static files are files that are not dynamic and aren't rendered with a template engine. These are files that should be served as-is, without modification. Some examples of static files are HTML, CSS, and JavaScript files that should be sent directly to the browser. Images such as JPGs and PNGs are also static.

It would be really unfortunate if we had to define a route and use `res.sendFile` for every static file in our application. Express.js makes this really easy by giving us a way to define a folder to put all of our static files.

```js
var express = require('express')
var app = express()
app.use(express.static('public'));
```

Now we can place a directory structure under a `public` folder for each type of static file we need to serve. This could create paths on our web application like:

* http://localhost:3000/images/logo.png
* http://localhost:3000/styles/main.css
* http://localhost:3000/scripts/tiles.js

Notice how `public` is **not** part of the URL even though the `images`, `styles` and `scripts` folders are inside `public`. To reference these files from your HTML files, you can use an absolute path, `/images/logo.png`.

