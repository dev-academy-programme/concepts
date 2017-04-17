When defining a stateful component in React, at least two methods are required: `constructor(props)`, and `render()`.

There are other methods you can add which React components will pick up and use during the 'lifecycle' of a component.
Read about them here : https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods

Lifecycle in this context refers to the different stages of an instantiated components life, from birth and attachment, to updating, through to 'death'.
The most important to start with are :
  - `componentWillMount` - before render
  - `componentDidMount` - after render (and has been mounted)
  - `componentWillUnmount` - before unmount

Here's a basic flow chart which might help : http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/