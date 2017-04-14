React provides a few component methods that are called at various times throughout a component's lifetime. 

* `componentWillMount` is invoked once, immediately before the initial rendering occurs.

* `componentDidMount` is invoked once, immediately after the initial rendering occurs.

* `componentWillReceiveProps` is invoked when the component is receiving new props.

* `shouldComponentUpdate` is invoked before rendering when new props or state is being received. If this function returns `false`, the `render` method will not be invoked as a result of this update.

* `componentWillUpdate` is invoked before rendering when new props or state is being received.

* `componentDidUpdate` is invoked immediately after the component's update have been rendered.

* `componentWillUnmount` is invoked immediately before a component is unmounted from the DOM.

For more information, see the [Component Specs and Lifecycle](https://facebook.github.io/react/docs/component-specs.html) article in the React documentation.
