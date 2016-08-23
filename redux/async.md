The docs provide an excellent introduction on how to write asynchronous operations in the context of Redux.

http://redux.js.org/docs/advanced/AsyncActions.html

> **Useful context** : on Reddit, a sub-forum is called a _subreddit_  e.g. www.reddit.com/r/NewZealand is a subreddit all about NZ, www.reddit.com/r/frontend is a subreddit about frontend dev.

The solution leads you to dispatching actions like this:

```js
store.dispatch(findImages('dragon')).then(() =>
  // 
  console.log(store.getState())
)
```

Here `findImages` is just an action creator, but a slightly fancy one (let's assume we're using [Superagent](https://github.com/visionmedia/superagent) to make the API call):

```js
function findImages (searchterm) {
  return (dispatch) => {
    dispatch(requestImages(searchterm))

    request
      .get(`https://api.instagram.com/v1/tags/search?q=${searchterm}`)
      .end((err, res) => {
        if (err) {
          return dispatch(retrievalError(err))
        }
        dispatch(receiveImages(searchterm, res.body)))
      })
  }
}
```

Some key ideas from this:

- We track progress of async calls using normal actions.
- We can call dispatch more than once during the process.
  - For example, we could display a loading spinner when the `REQUEST_IMAGES` action is dispatched.
- The function returned by the action creator is handled by thunk middleware (which takes care of providing the `dispatch` parameter, and `getState` is also available if required).
