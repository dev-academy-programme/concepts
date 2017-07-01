# Pseudo-classical Inheritance (ES5)

Many programming languages use the concepts of `class`, `subclass` and `inheritance` to assist with code reuse. When we create objects of a particular subclass these objects inherit properties and methods from their parent class. This allows us to write code once on the parent class and have it inherited and reused on its descendants. 

JavaScript ES5 does not implement "classical inheritance" in the same way as other languages. Instead its common to use "prototypal inheritance" to mimic classical inheritance with constructor functions. Its also possible to use factory functions to implement inheritance. As these are not true classes we sometimes call these "pseudo-classes". The examples below show how to implement the classical inheritance pattern with the tools available in ES5:


## Prototypal inheritance with constructor functions

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
  Post.apply(this, arguments) // call the "parent" pseudo-class constructor 
  this.likeCount = 0
}

Comment.prototype.like = function () {
  this.likeCount ++ 
}

Comment.prototype = Object.create(Post.prototype)
Comment.prototype.constructor = Comment

function Discussion (options) {
  Post.apply(this, arguments)
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

var frodoComment = new Comment({ 
  author: 'Frodo', 
  content: 'One idea is to throw it into a volcano. What does everyone think?'
})

console.log(frodoComment.getCreatedAt())
// 1471297024140 (unix time)
oneRingDiscussion.addComment(frodoComment)
console.log(frodoComment === oneRingDiscussion.getCommentAtIndex(0))
// true

console.log(frodoComment instanceof Comment)
// true
```

The code above implements a parent constructor function `Post` and its two child constructor functions `Discussion` and `Comment`. We might imagine that this code drives an online discussion forum. `Post` has three properties `author`, `content` and `createdAt` and one method `getCreatedAt()`. When we define `Comment` and `Discussion` we call the parent constructor method passiing in a reference the current context `this` and the child's `arguments`. This lets `Discussion` and `Comment` inherit `Post`'s properties and the `getCreatedAt()` method (this is equivalent to calling `super` in ES6). Child constructor functions can also implement their own properties and methods.

We then instantiate `Comment` and `Discussion` instances using the `new` keyword as we would do with ES6 classes.


## The inheritance pattern with factory functions 

Its possible to implement pseudo-classical inheritance with factory functions, though this is not standard. Child "pseudo-classes" instantiate a plain object instance of their parent inside the scope, then mutate these objects adding new properties. The code below shows how we might implement our forum software inheritance pattern with factory functions.

```js
function Post (options) {
  return {
    author: options.author,
    content: options.content,
    createdAt: Date.now(),
    getCreatedAt: function () {
      return this.createdAt
    }
  }
}

function Comment (options) {
  // call the 'parent' factory function 
  var comment = Post(options) 

  // mutate
  comment.likeCount = 0
  comment.like = function () {
    this.likeCount ++
  }
  
  return comment
}

function Discussion (options) {
  var discussion = Post(options)  
  discussion.title = options.title
  discussion.comments = []

  discussion.addComment = function (comment) {
    this.comments.push(comment)
  }

  discussion.getCommentAtIndex = function (index) {
    return this.comments[index]
  }

  return discussion
}

var oneRingDiscussion = Discussion({
  title: 'Destroying the one ring',
  content: "Let's brainstorm ideas for destroying the one ring",
  author: 'Gandalf'
})

var frodoComment = Comment({ 
  author: 'Frodo', 
  content: 'One idea is to throw it into a volcano. What does everyone think?'
})

console.log(frodoComment.getCreatedAt())
// 1471297024140 (unix time)
oneRingDiscussion.addComment(frodoComment)
console.log(frodoComment === oneRingDiscussion.getCommentAtIndex(0))
// true

console.log(frodoComment instanceof Comment)
// false
console.log(frodoComment instanceof Object)
// true
```


## Differences

We call Constructor functions using the `new` keyword while we call factory functions like regular functions. Constructor function instances can be checked against their constructor with the `instanceof` keyword while factory function instances are regular `Object` instances.

The more informative `instanceof` behaviour of constructor functions may be useful in codebases where checking the pseudo-class of instances is important for error catching, for example:

```js
Discussion.prototype.addComment = function (comment) {
  if (!(comment instanceof Comment)) {
    throw new Error("you've tried to add something that isn't a comment!")
  }
  this.comments.push(comment)
}
```


## Further Information

  * [http://javascript.crockford.com/inheritance.html](http://javascript.crockford.com/inheritance.html)
  * [Pseudo-classical pattern](http://javascript.info/tutorial/pseudo-classical-pattern)
  * [Classical inheritance with Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Classical_inheritance_with_Object.create())
  * [FunFunFunction - Factory Functions](https://www.youtube.com/watch?v=ImwrezYhw4w)
  * [Understanding JavaScript constructors](https://css-tricks.com/understanding-javascript-constructors/)
  * [Factory constructor pattern](http://javascript.info/tutorial/factory-constructor-pattern)
  * [Defending constructors](http://www.2ality.com/2013/07/defending-constructors.html)
  * [instanceof](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/instanceof)

