Redux is a small library with a strong opinion about how UI views (components) should be managed. We could say, _Redux is nothing more than a state container_, but that's getting a little ahead of ourselves. That statement should make sense shortly.

**A UI view is a function of state**. State is simply data; a JavaScript object in our case. To say that _y is a function of x_ just means that _y_ is the result of passing _x_ through a function. In Redux UI views &mdash; JSX components in our case &mdash; are the result of applying state, and reapplying the new state each time the state changes. This is consistent with what we've seen in both Handlebars templates and React.

> Redux provides a consistent, beneficial way to manage the continually changing state being applied to our components.

In order to reap the benefits of Redux we must implement a few concepts and follow some guidelines. These are the primary concepts in a Redux application:

* A component or view is the visual part of our application. In React, these are written in JSX.
* The _store_ is where **all** of the state of our application is stored and maintained.
* _Actions_ are JavaScript objects that describe something that has happened in the application.
* _Reducers_ are JavaScript functions that accept the current state and an action and return the new state.

Here is a visual that provides a bit more detail:

![Redux components](https://raw.githubusercontent.com/dev-academy-programme/concepts/master/images/redux-overview.jpg)

1. During initialisation the application will call Redux's `createStore()` method which tells Redux to create a store for the application. Redux only maintains a single store for an application.

  Once the store is created, the view subscribes to state changes by calling the store's `subscribe()` method and passing an event handler (callback) so it can respond to any state changes.

2. While the application is being used, it will perform actions, which can come from user interaction or external events such as web API responses. When these things happen, our application will create create JavaScript objects that represent the action.

3. The action object is sent to the store using the store's `dispatch()` method to let the store know something has happened.

4. The store needs to know what impact this action has on the state. This is the job of the reducer. The store passes the current state and the action to the reducer: `reducer(state, action)`

5. The reducer's only job is to return the new state. This should be a _pure function_, a function that has no side effects and only calls other pure functions. A pure function should always return exactly the same value when called with the same parameters. Pure functions also do not alter its arguments.

6. When the reducer returns the new state to the store, the store updates the state and calls all subscribed listeners. When the event handler on the view (stateful component) is called by the store, it can call the store's `getState` method to get the changed state and then take the appropriate action.

The previous steps describe the low-level events when an action results in updating the application's state. As we learn more about Redux and how to use it with React, we'll understand how many of these steps are hidden from us. Even though there will be less for us to do, it's important to understand what is being done for us. Hopefully this has provided a solid foundation.

The earlier comment made about how _Redux is nothing more than a state container_ should make more sense now.
