Before the introduction of classses in ES6 it was possible to mimic class inheritance by leveraging [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create). The example 

## Example

```js
function Post (options) {
  this.author = options.author
  this.content = options.content
  this.createdAt = Date.now()
}

Post.prototype.getCreatedAt = function () {
  return this.createdAt
}

function Comment () {
  Post.prototype.constructor.apply(this, arguments) // call the "parent" pseudo-class constructor 
  this.likeCount = 0
}

Comment.prototype.like = function () {
  this.likeCount ++ 
}

Comment.prototype = Object.create(Post.prototype)
Comment.prototype.constructor = Comment

function Discussion (options) {
  Post.prototype.constructor.apply(this, arguments)
  this.title = options.title
  this.comments = []
}

Discussion.prototype.addComment = function (comment) {
  this.comments.push(comment)
}

Discussion.prototype.getCommentAtIndex = function (index) {
  return this.comments[index]
}

var oneRingDiscussion = new Discussion({
  title: 'Destroying the one ring',
  content: "Let's brainstorm ideas for destroying the one ring",
  author: 'Gandalf'
})

const frodoComment = new Comment({ 
  author: 'Frodo', 
  content: 'One idea is to throw it into a volcano. What does everyone think?'
})

console.log(frodoComment.getCreatedAt())
oneRingDiscussion.addComment(frodoComment)
console.log(frodoComment === oneRingDiscussion.getCommentAtIndex(0))
```

The code above implements a parent constructor function `Post` and its two child constructor functions `Discussion` and `Comment`. We might imagine that this code drives an online discussion forum. `Post` has three properties `author`, `content` and `createdAt` and one method `getCreatedAt()`. When we define `Comment` and `Discussion` we call the parent constructor method passiing in a reference the current context `this` and the child's `arguments`. This lets `Discussion` and `Comment` inherit `Post`'s properties and the `getCreatedAt()` method and is equivalent to calling `super` in ES6. Child constructor functions can also implement their own properties and methods.

We then instantiate `Comment` and `Discussion` instances using the `new` keyword as we would do with ES6 classes.

## Further Information

  * [Pseudo-classical pattern](http://javascript.info/tutorial/pseudo-classical-pattern)
  * [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
