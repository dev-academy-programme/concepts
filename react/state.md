React components use two different kinds of data: _state_ and _props_. State is data that undergoes change within a component, and props is data that is passed to a component for rendering, and should not change.

One way to think of the difference is:
- **State** is data created **within** a React Component and can be changed within a component using `this.setState()`
- **Props** is data **passed down** from a parent Component and should not be changed.

One use of state is the data returned from API calls. In this example, the `<App />` component consumes a web API to retrieve widgets.

```js
import React from 'react'

import api from '../api'
import WidgetList from './WidgetList'

class App extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      widgets: []
    }
    this.renderWidgets = this.renderWidgets.bind(this)
  }
  
  componentDidMount () {
    api.getWidgets(this.renderWidgets)
  }

  renderWidgets (err, widgets) {
    this.setState({
      widgets: widgets
    })
  }

  render () {
    return (
      <div>
        <h1>Widgets FTW!</h1>
        <WidgetList widgets={this.state.widgets} />
      </div>
    )
  }
}

export default App
```

There are a number of things to notice about the sample above. 

* The component sets its initial state using the `constructor` method. This must be done so the component doesn't throw errors before the first `this.setState` call.

* In the callback from the API call, `this.setState` is used to trigger a render. This is how React knows to call the render method again. 

* The state is being passed down to child components (`<WidgetList />` in this case) as props. This is a common pattern. `<App />` is responsible for rendering itself and its child components, but the child components only render using props.

* The component waits until it has been mounted before calling the API. It does this by using the `componentDidMount` function, which is one of the lifetime methods.

For more information about how to use state, see the [Interactivity and Dynamic UIs](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html) article in the React documentation.
