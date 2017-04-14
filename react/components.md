React forces you to think about your user interfaces as sets of _components_: small composable areas of the view. Components are composed in a hierarchical structure with _container components_ acting as parents of _child components_. Each component is made up of the user interface elements (JSX) and data. The guidance is to deconstruct your views into components and understand what data they contain before you begin building your user interface. 

This is an example of a component:

```js
// Header.jsx
import React from 'react'

class Header extends React.Component {
  render() {
    return (
    <div>
      <h1>Header</h1>
    </div>
    )
  }
}

export default Header
```

This component will be imported into the app using:

```js
// App.jsx
import React from 'react'
import Header from './Header'

class App extends React.Component {
  render() {
    return (
    <div>
      <Header />
    </div>
    )
  }
}

export default App
```
