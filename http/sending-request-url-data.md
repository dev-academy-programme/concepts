# Sending Request URL Data

There are two ways to send data in the URL: the query string and route parameters.

## Query String

```
GET http://mycats.herokuapp.com/api/v1/cats?name=fluffy+joe&city=wellington
```

When the server receives this GET request, if the request object is `req`, there will often be a way to access the query string. In Express, it's `req.query`, and the object returned would look like this: 

```js
{
  name: 'fluffy joe',
  city: 'wellington'
}
```

Reference: http://expressjs.com/en/api.html#req.query

This type of data is used to filter the data returned from an HTTP GET request, not to send data to be saved by the server.


## Route Parameters

Consider this example:

```
GET http://mycats.herokuapp.com/api/v1/cats/12/edit
```

On the server-side, it's common to set up routes to accept parameters. In this example the route definition would be:

```js
app.get('api/v1/cats/:id/edit', (req, res) => {
  console.log(req.params)
  //...
})
```

Using Express in the example above, `req.params` would return: 

```js
{ 
  id: 12
}
```

Reference: http://expressjs.com/en/api.html#req.params

