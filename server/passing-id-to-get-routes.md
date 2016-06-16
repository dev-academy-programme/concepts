Say you have an `/edit` route to update widgets. To target the specific widget with an ID of 3, you can use `/edit?id=3`. This route will use the value of `req.query.id` to find the record in the database and use this record to populate the form.

```xml
<form action="/update" method="post">
  <input type="text" name="widgetName" value="{{widget.name}}">
  <input type="hidden" name="widgetId" value="{{widget.id}}">
  <button>Update widget</button>
</form>
```

Notice how this uses the hidden input field to post the ID back to the `/update` route so it will know which widget to update. This is what these routes look like:

```js
app.get('/edit', routes.add)
app.post('/update', routes.create)
```

Because `/update` is a post, we know we shouldn't `res.render()` in its route. However, after the changes are saved, we should show the widget that was changed so the user can see their saved changes. To do this, we need to redirect to the specific widget. If the route for a specific widget is `/widget`, we would `res.redirect('/widget?id=' + id)`, assuming `id` is available. Here's a more complete example:

```js
function update (req, res) {
  var id = req.body.widgetId
  var name = req.body.widgetName
  data.updateWidget({
    name: name
  })
  .then(function () {
    return res.redirect('/widget?id=' + id)
  })
  .catch(function (err) {
    return res.send(500, err)
  })
}
```
