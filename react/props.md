Components receive their data in the form of props. If we wanted to make the header text of the example above more flexible, we could pass the text as a prop.

```js
// Header.jsx
import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
}

export default Header
```

Notice how it is using `this.props.text` to get the value. This prop is passed in using what looks like an HTML attribute of the same name, `text`. Props can be named anything that is a valid JavaScript identifier.

```js
// App.jsx
import React from 'react'
import Header from './Header'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header text="This Page is About Cats" />
      </div>
    )
  }
}

export default App
```
