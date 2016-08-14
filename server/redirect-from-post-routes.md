When doing server-side rendering, it's common to have a route that shows a form to either add or edit some data. These forms POST to a different route that saves the data posted from the form. For example, you might have a GET `/add` route that shows a form and and a POST `/create` route that saves the data.

```js
app.get('/cats/new', routes.new)
app.post('/cats', routes.create)
```

Inside `routes.new` you will likely `res.render()` the form, but in `routes.create` you should NOT `res.render()` because it leads to a poor user experience and fragments your views. This is because if the user refreshes the resulting page, their browser will prompt them to resubmit the form data, which could be confusing. 

Also, think about what page you would render from `POST`ing to `/cats`. If you're adding something, you're probably adding to a list of things.  You probably already have an exiting route that shows this list (`GET` `/cats`). Having two different routes that show the same page gets confusing, and dangerous. It's much better in this case to `res.redirect()` to the list route you already have.

