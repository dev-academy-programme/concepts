At its simplest, authentication is the science of proving the identity of a client making a request to a server. If the client is attempting to access material that isn't publically available (private messages, for example) we need a way to make sure they are who they say they are.

Authentication can be complex, especially when starting out as a developer. Take it step by step, ask lots of questions, and read from trusted sources. Remember, anyone can publish a tutorial on the web! Read examples from stable projects and have your code reviewed by more experienced developers wherever possible. Getting 'more eyes' on something can be a powerful way of exposing potential problems.

Above all, avoid writing your own 'custom' authentication as much as possible! This is one of those areas where re-using tried and tested solutions is the best way to go. Even very smart people get authentication wrong: don't fall into the same trap.


### Types of authentication

There are an awful lot of ways we authenticate on the internet. When we're talking about web development, they fall into two broad areas:

 - _local_ authentication: we store a username and password for each user on our own server
 - _third party_ authentication: we 'outsource' authentication to another provider like Facebook or Google

We also have a few different kinds of resources to protect:

 - _server-side_ rendered routes: we usually use sessions to keep track of users and their login status
 - _API_ routes: we require the client (often a front-end JavaScript app) to send authentication with each request
