In order to respond to user events, component functions can be bound to [virtual ] DOM events. In this example, a `showDetails` function in the `<WidgetList />` component is called when a link is clicked in the `<WidgetListItem />` component.

```js
// WidgetList.jsx
import React from 'react'
import WidgetListItem from './WidgetListItem'

export default React.createClass({
  render () {
    return (
      <div className="widget-list">
      {this.props.widgets.map((widget) => {
        return <WidgetListItem 
          key={widget.id}
          name={widget.name}
          showDetails={() => this.showDetails(widget)} />
      })}
      </div>
    )
  },

  showDetails (widget) {
    console.log(widget)
  }
})
```

Notice how the local `showDetails` function is being passed as a prop to the `<WidgetListItem />` component. Additionally, notice how each `widget` object is passed as the first parameter to the `showDetails` function. This is how the prop is used in the child component.

```js
// WidgetListItem.jsx
import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className="widget-list-item">
        {this.props.name} {' '}
        <a href="#" onClick={this.props.showDetails}>details</a>
      </div>
    )
  }
})
```

The `showDetails` event handler is used directly from `this.props` as is already bound to the correct `widget`.

In case you're wondering, the `{' '}` bit is to create some whitespace between the widget name and the details link.

