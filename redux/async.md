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

Here `findImages` is just an action creator, but a slightly fancy one:

```js
function findImages(searchterm) {

  return (dispatch) => {
    dispatch(requestImages(searchterm))

    return request.get(`https://api.instagram.com/v1/tags/search?q=${searchterm}`)
      .then(response => response.json())
      .then(json => dispatch(receiveImages(subreddit, json)))
  }
}
```

Some key ideas from this:

- We track progress of Async calls using normal actions and state
- The function returned by the is handled by thunk middleware
- We return a promise we can do fancy stuff later
