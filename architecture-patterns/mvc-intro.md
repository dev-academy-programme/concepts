Building database-driven web applications requires a lot of moving parts: the server, views, routes, data access code, etc. For your application to be maintainable, it's very important to adhere to the _Single Responsibility Principle_ by putting each of these responsibilities in their own modules (files).

Model-View-Controller (MVC) is one of the most common _separated presentation_ patterns. These patterns describe how to structure code according to the Single Responsibility Principle.

**Model** is the data representation we apply to our templates. This is the second parameter we've been passing to templates with `res.render('view', model)`. We've also called it a _view model_ because this model is built specifically for a view.

**View** is the visual representation part of the code - our templates. We've built these using HTML and Handlebars.

**Controller** is the code that coordinates the interaction of the data (the model) and the view. We've been doing this in our `routes.js` file, but that often causes our routes to do too much. By creating a separate `controller.js` we can reduce the responsibility of our routes to get the view model from the controller, and apply it to the view.

