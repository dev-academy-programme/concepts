A [session](https://en.wikipedia.org/wiki/Session_(computer_science)) is a way our server can remember who a client is on repeated http calls.
If we didn't have sessions you would need to reenter your password every time you wanted to view a restricted page.

There is quite a bit going on under the hood to make a session work but they are very simple to use. Express maintains an object on the request (`req.session`) which acts
just like any other javascript object. You can save data using `req.session.userID = 23` and read data with `console.log(req.session.userID)`.