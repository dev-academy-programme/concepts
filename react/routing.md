When we start making single-page apps with dynamic interfaces (using React, Angular, Ember amongst others) we don't want to reload the page. Having said that, we still want the URL to reflect which part of the UI a user is looking at. This is often called the _view_.

When the view changes, the user sees a different URL. The URL can be linked to from outside the site and the browser will load the correct view. However, the page is only loaded from the server _once_: everything else is done client-side, with API requests to communicate with the server as required.

In React, we can manage client-side routing using [React Router](https://github.com/reactjs/react-router).


### Routing to components

```jsx
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  render(
    (
      <Router history={hashHistory}>
        <Route path='/' component={App} />
      </Router>
    ),
    document.getElementById('app')
  )
})
```

When the user visits any URL on your site, they'll end up looking at the `App` component. The URL will be a little strange looking! For example:

```
https://localhost:8080/#/?_k=b2xoft
```

This is _hash routing_. It's used to prevent browsers from firing off a request to the server every time a URL like `https://localhost:8080/routename` is visited. There's a way around it (with some caveats): check out [browserHistory](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#browserhistory). The weird-looking querystring is for [storing location state](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#what-is-that-_kckuvup-junk-in-the-url).

When we want to add a new route, we just add it inside the `Router` component:

```jsx
<Router history={hashHistory}>
  <Route path='/' component={App} />
  <Route path='/users' component={Users} />
</Router>
```

Each time you add a new route, you'll need to `import` the component that it references. Visitors to `/#/users` will see the `Users` component and not `App`.

We can use an `IndexRoute` component instead of a `Route` component if we want to specify a default route for our app. For example, we may wish to render a landing/home page when a user first loads our app. Notice how we don't have to specify a path. This is not needed because the `Landing` component is the default child for our `App` component and therefore the path would be `/`:

```jsx
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
    </Route>
  </Router>
```


### Linking to routes

We can create links between our routes, but we don't do it using an anchor tag (`<a href=""></a>`). Instead, React Router provides us with a `Link` component:

```jsx
// App.jsx
import {Link} from 'react-router'

// ...

  render () {
    return (
      <div>
        Welcome! Choose from the following pages:
        <ul>
          <li><Link to="/wombats">All about wombats</Link></li>
          <li><Link to="/aardvarks">All about aardvarks</Link></li>
          <li><Link to="/jerboas">All about jerboas</Link></li>
        </ul>
      </div>
    )
  }
```

The `to` prop in each `Link` tells us which route it's going to.


### Route parameters

To specify a route parameter (a variable in the URL which will be available in the route's component) React Router uses a similar scheme to many other libraries: a colon followed by the variable name.

```jsx
<Router history={hashHistory}>
  <Route path='/' component={App} />
  <Route path='/wombats/:id' component={Wombats} />
  <Route path='/aardvarks/:name' component={Aardvarks} />
</Router>
```

 - The second route above will match `/wombats/123` and `/wombats/abc`. The id from the URL will be available in `this.props.params.id`.
 - The third route above will match `/aardvarks/123` and `/wombats/abc`. The name from the URL will be available in `this.props.params.name`.

```jsx
// Wombats.jsx
render () {
  return (
    <p>You asked for the wombat with id {this.props.params.id}.</p>
  )
}
```


### Nesting routes and layouts

Routes can be nested inside each other. This is a bit like Handlebars templates using layouts and partials. For example, if we want all `/kumquat` routes to use a particular look and feel (perhaps a consistent header and footer) we can put that content in a component and specify it in our routing:

```jsx
<Router history={hashHistory>
  <Route path='/' component={App} />
  <Route component={KumquatLayout}>
    <Route path='/kumquats' component={Kumquats} />
    <Route path='/kumquat-specialties' component={KumquatSpecialties} />
    <Route path='/more-kumquats' component={MoreKumquats} />
  </Route>
</Router>
```

Notice that `KumquatLayout` is not a self-closing tag: it has a beginning and end tag, surrounding three other `Route`s. In `KumquatLayout` we can put something like this:

```jsx
render () {
  return (
    <div>
      <hr />
      {this.props.children}
      <hr />
    </div>
  )
}
```

`this.props.children` places the child component (`Kumquats`, for example) inside `KumquatLayout`. You can nest even further:

```jsx
<Router history={hashHistory}>
  <Route path='/' component={App}>
    <Route path='wombats' component={Wombats}>
      <Route path=':id' component={Wombat} />
    </Route>
  </Route>
</Router>
```

Notice there's no leading `/` before the two nested routes. You'd need to reference `{this.props.children}` inside both `Wombats` and `Wombat`.


### Resources

- https://github.com/reactjs/react-router
- https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.6jw7gtaic
