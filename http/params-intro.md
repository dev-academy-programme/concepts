Short for parameters. These are one way to send info in a request.
Params can be found in a couple of places and might be named differently depending on your framework.

Two kinds of params:

#### Params in a query 

e.g.

```js
http://mycats.herokuapp.com/api/v1/cats?name=fluffy+joe&city=wellington
```

When the server receives this get request, if the request object is `req`, there will often be a way to access the query params.
In express, is `req.query`, and the object you get would look like this: 

```js
{
  name: 'fluffy joe',
  city: 'wellington'
}
```

Ref: http://expressjs.com/en/api.html#req.query

#### Params in a route 

e.g. 

```js
http://mycats.herokuapp.com/api/v1/cats/12/edit
```

On the server-side, it's common to set up routes to accept parameters.
In this example the route definition would be like:

```js
app.get('api/v1/cats/:id/edit', function(req, res) {
  console.log(req.params)
  //...
})
```

In express, is `req.params` for that example request about would return : 

```js
{ 
  id: 12
}
```

Ref: http://expressjs.com/en/api.html#req.params
