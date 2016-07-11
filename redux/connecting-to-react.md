During React's unidirectional data flow, data is passed down through the component tree using _props_. Redux manages the application state that can be used as data for React. We are certainly capable to wire these libraries together using JavaScript, but the easiest way to combine them is to use the `react-redux` package.

At least two things need to happen to get these libraries working well together.

1. React components need to be notified when to re-render a component tree. Normally we do this using the `setState()` method on React components. Since we'll be using Redux to manage the state, a perfect trigger is a store listener that's called on state changes.

2. New state and actions need to be applied to the component tree. React uses props for data when rendering components so it's reasonable to apply the Redux state to the React props.
