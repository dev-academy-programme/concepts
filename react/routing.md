When we start making single-page apps with dynamic interfaces (using React, Angular, Ember amongst others) we don't want to reload the page. But we still want the URL to reflect which part of the UI a user is looking at. This is often called the _view_.

When the view changes, the user sees a different URL. The URL can be linked to from outside the site and the browser will load the correct view. However, the page is only loaded from the server _once_: everything else is done client-side, with API requests to communicate with the server as required.

In React, we can manage client-side routing using [React Router](https://github.com/ReactTraining/react-router).


### Routing to components

We're going to be using React Router on the web (it can also be used in other environments) so we're going to install the `react-router-dom` npm module.

```jsx
import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Team from './components/Team'

const App = (props) => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/team' component={Team} />
      </div>
    </Router>
  )
}

export default App
```

When the user visits any URL on your site, they'll end up looking at the `App` component and one of the route components inside of it depending on the URL.

The URL will be a little strange looking! For example:

```
https://localhost:8080/#/?_k=b2xoft
```

This is _hash routing_. It's used to prevent browsers from firing off a request to the server every time a URL like `https://localhost:8080/routename` is visited. 

When we want to add a new route, we just add it inside the `Router` component:

```jsx
<Router>
  <div>
    <Route exact path='/' component={Home} />
    <Route path='/users' component={Users} />
  </div>
</Router>
```

Each time you add a new route, you'll need to `import` the component that it references. Visitors to `/#/users` will see the `Users` component and not `Home`.

We can use `exact` when we want to specify a default route for our app. For example, we may wish to render a home page when a user first loads our app. This is not needed because the `Landing` component is the default child for our `App` component and therefore the path would be `/`:

```jsx
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
```


### Linking to routes

We can create links between our routes, but we don't do it using an anchor tag (`<a href=""></a>`). Instead, React Router provides us with a `Link` component:

```jsx
// App.jsx
import {Link} from 'react-router-dom'

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

To specify a route parameter (a variable in the URL which will be available in the route's component), React Router uses a similar scheme to many other libraries: a colon followed by the variable name.

```jsx
<Router>
  <div>
    <Route exact path='/' component={App} />
    <Route path='/wombats/:id' component={Wombats} />
    <Route path='/aardvarks/:name' component={Aardvarks} />
  </div>
</Router>
```

 - The second route above will match `/wombats/123` and `/wombats/abc`. The `id` from the URL will be available in `props.match.params.id`.
 - The third route above will match `/aardvarks/123` and `/aardvarks/abc`. The `name` from the URL will be available in `props.match.params.name`.

```jsx
// Wombats.jsx
render ({match}) {
  const {id} = match.params // using ES6 destructuring
  return (
    <p>You asked for the wombat with id {id}.</p>
  )
}
```


### Nesting routes

Routes are nested in a hierarchy, just like the URL itself. Components have a one-to-one mapping with levels in a URL. So to nest routes (URLs), you do so my nesting components. Within the component you will add any routes that display components deeper in the hierarchy.

```jsx
// App.jsx
<Router>
  <div>
    <p>The UI for App goes here</p>
    <Route path='/kumquats' component={Kumquats} />
  </div>
</Router>
```

```jsx
// Kumquats.jsx
<Router>
  <div>
    <p>The UI for Kumquats goes here</p>
    <Route path=`${match.url}/wombats` component={Wombats} />
  </div>
</Router>
```

To see the `Kumquats` component, which is wrapped in the `App` component, we would navigate to `/Kumquats/wombats`


### Resources

* https://reacttraining.com/react-router/web/guides/quick-start
* https://egghead.io/courses/add-routing-to-react-apps-using-react-router-v4
