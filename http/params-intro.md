Params is short for parameters. These are one way to send information in a request. Params can be found in a couple of places and might be named differently depending on your framework.

There are two kinds of params:

#### Params in a query 

```js
http://mycats.herokuapp.com/api/v1/cats?name=fluffy+joe&city=wellington
```

When the server receives this get request, if the request object is `req`, there will often be a way to access the query params. In Express.js, it's `req.query`, and the object returned would look like this: 

```js
{
  name: 'fluffy joe',
  city: 'wellington'
}
```

Ref: http://expressjs.com/en/api.html#req.query

These types of params are used to filter the data returned from an HTTP GET request, not to send data to be saved by the server.


#### Params in a route 

e.g. 

```js
http://mycats.herokuapp.com/api/v1/cats/12/edit
```

On the server-side, it's common to set up routes to accept parameters. In this example the route definition would be:

```js
app.get('api/v1/cats/:id/edit', function(req, res) {
  console.log(req.params)
  //...
})
```

Using Express.js, in the example above `req.params` would return: 

```js
{ 
  id: 12
}
```

Ref: http://expressjs.com/en/api.html#req.params
