Say you have a `POST` `/cats/:id` route to update cats. (Note: this would ideally be a `PUT`, but browsers can't reliably use it). So to update the cat with ID 3, we would visit `/cats/3/edit`. On this page would be a form that looks like:

```xml
<form action="/cats/{{cat.id}}" method="post">
  <input type="text"   name="name" value="{{cat.name}}">
  <button>Update cat</button>
</form>
```

Notice we're setting the form to post to `/cats/{{cat.id}}` which would be rendered to `/cats/3` in our case.

On the server our routes would look something like:

```js
app.get('/cats/:id/edit', routes.edit)
app.post('/cats', routes.create)
app.post('/cats/:id', routes.update)
```

The update route will be able to access the id of the cat we're updating by looking in `req.params`. Specifically for a form posted to `/cats/3`, `req.params` will equal:

```js
{
  id: '3'
}
```

(notice that 3 is a string not a number)

Here's a more complete example:

```js
function update (req, res) {
  var id = Number(req.params.id)
  var name = req.body.name

  data.updateCat({
    name: name
  })
  .then(function () {
    return res.redirect('/cats/' + id)
  })
  .catch(function (err) {
    return res.send(500, err)
  })
}
```
