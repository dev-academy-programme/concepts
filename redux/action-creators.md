Action creators are functions that return action objects. Even though actions are simple JavaScript objects, creating them with functions make them easier and more consistent to create and test.

Given that actions are objects and reducers are pure functions (no side effects), action creators provide a place to perform async operations and call impure functions.
