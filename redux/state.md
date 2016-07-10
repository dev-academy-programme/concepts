In React there are two kinds of components: those that are aware of and respond to state changes, called stateful _containers_, and those that only render the data supplied to them, called stateless _components_. This does not change when using Redux &mdash; it actually makes it easier. Both of these things necessary to get these libraries working well together can be placed in a stateful component &mdash; the only kind that knows about Redux.

### Making the store available

Stateful components will exist inside of stateless components and visa versa for potentially many layers deep. We don't want to have to pass the Redux store through all of the layers &mdash; especially if they aren't going to use it. The `react-redux` package provides the `Provider` component that makes the store available to all containers regardless of their location in the hierarchy.

```js
import { Provider } from 'react-redux'
let store = Redux.createStore(reducer)
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  document.getElementById('app')
)
```

### State change notifications

The first thing we listed above that needs to happen to use these libraries together is for React components to be re-rendered during Redux state changes. The `react-redux` package provides the `connect()` function for this very reason. In our stateful containers, we pass `connect` two functions we want to be called during state changes: `mapStateToProps` and `mapDispatchToProps`.

```js
const ListOfAllThings = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingList)

export default ListOfAllThings
```

In the function `connect()` returns, we pass the stateless component we want the data applied to (`ThingList` in our example). But where does its data (props) come from?

### Mapping Redux state to React props

The `mapStateToProps` function is called with the Redux state as a parameter and this function gives us the opportunity to map state into props the component (`ThingList` in our example) is expecting.

```js
const mapStateToProps = (state) => {
  return {
    things: state.things
  }
}
```

In our example, `ThingList` is expecting a prop called `things` so we populate it with the array from the state being passed in.

### Mapping bound Redux actions to React props

The `mapDispatchToProps` works the same way `mapStateToProps` does. It is called each time the Redux store experiences a state change. It passes a `dispatch` function we can wrap and pass to our stateless components as props.

```js
import { showDetails } from '../actions'
const mapDispatchToProps = (dispatch) => {
  return {
    showDetails: (id) => {
      dispatch(showDetails(id))
    }
  }
}
```

Now when our `ThingList` component calls `this.props.showDetails` with an `id`, it will pass the `id` to our action creator and the action it returns will be dispatched to the Redux store.
