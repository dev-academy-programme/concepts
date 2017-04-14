JSX is a syntax extension to javascript which can be thought of as a hybrid between HTML and javascript:

```js
import React from 'react'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
}
```

JSX works really well with React as we are using it to describe what the UI looks like (our View).

While it **looks** like HTML, be warned, **JSX is not HTML**. JSX actually gets transpiled into javascript. As such, there are number of *gotchas* to be aware of:

1. Adjacent JSX elements must be enclosed in an enclosing tags:

```js
// BAD
render () {
  return (
    <h1>Hello World!</h1>
    <h2>Welcome to React</h2>
  )
}

// GOOD
render () {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Welcome to React</h2>
    </div>
  )
}
```

2. All tags must either self-close or have a corresponding closing tag:

```js
// BAD
render () {
  return (
    <div>
      <h1>Hello World!<h1> // No corresponding closing tag
      <input type="text" name="input"> // Doesn't self close
    </div>
  )
}

// GOOD
render () {
  return (
    <div>
      <h1>Hello World!</h1>
      <input type="text" name="input" />
    </div>
  )
}
```

3. Any javascript within JSX must be enclosed within curly braces:

```js
// BAD
render () {
  const title = "Hello World!"
  return (
    <div>
      <h1>title<h1>
      <p>1+2+3</p> // outputs 1+2+3
    </div>
  )
}

// GOOD
render () {
  const title = "Hello World!"
  return (
    <div>
      <h1>{title}</h1>
      <p>{1+2+3}</p> // outputs 6
    </div>
  )
}
```
For more information, the React documentation introducing JSX is a great read: https://facebook.github.io/react/docs/introducing-jsx.html
