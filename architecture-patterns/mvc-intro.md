Building database-driven web applications requires a lot of moving part: the server, views, routes, data access code, etc. For your application to be maintainable, it's very important to adhere to the _Single responsibility principle_ by putting each of these responsibilities in their own modules (files).

There is a very common pattern called Model-View-Controller (MVC) that is one of the most common _separated presentation_ patterns. These patterns describe how to structure code according to the single responsibility principle.

**Model** is the data representation we apply to our templates. This is the second parameter we've been passing to `res.render('view', model)`. We've also called it a _view model_ because this model is built specifically for a view.

**View** is the visual representation part of the code - our templates. We've built these using HTML and Handlebars templates.

**Controller** is the code that coordinates the interaction of the data (the model) and the view. We've been doing this in our `routes.js` file, but that often causes our routes to do too much. By creating a separate `controller.js` we can reduce the responsibility of our routes to get the view model from the controller, and apply it to the view.

