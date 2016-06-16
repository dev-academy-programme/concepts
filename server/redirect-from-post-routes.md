When doing server-side rendering, it's common to have a route that shows a form to either add or edit some data. These forms POSTS to a different route that saves the data posted from the form. For example, you might have a GET `/add` route that shows a form and and a POST `/create` route that saves the data.

```js
app.get('/add', routes.add)
app.post('/create', routes.create)
```

Inside `routes.add` you will likely `res.render()` the form, but in `routes.create` you should NOT `res.render()` because it leads to a poor user experience and fragments your views. This is because if the user refreshes the resulting page, their browser will prompt them to resubmit the form data, which they will most likely find confusing. Also, think about what page you would render from `/create`. If if you're adding something, it will probably be a list of things you're adding. But you probably already have an exiting route that shows this list. Having two different routes that show the same page gets confusing. It's much better in this case to `res.redirect()` to the list route you already have.

This pattern of using different routes together also applies when updating an existing entity. However, in this case an `id` is needed to target the entity.
