ES6 introduced the `class` and `extends` and `super` keywords. These keywords allow us to implement the classical inheritance pattern used in many other programming languages. An example of class inheritance is shown below:

## Example

```js
class Post {
  constructor(options) {
    const { author, content } = options
    this.author = author
    this.content = content
    this.createdAt = Date.now()
  }

  getCreatedAt() {
    return this.createdAt
  }
}

class Comment extends Post {
  constructor(options) {
    super(options)
    this.likeCount = 0
  }

  like() {
    this.likeCount ++ 
  }
}

class Discussion extends Post {
  constructor(options) {
    super(options)
    this.title = options.title
    this.comments = []
  }

  addComment(comment) {
    this.comments.push(comment)
  }

  getCommentAtIndex(index) {
    return this.comments[index]
  }
}

const oneRingDiscussion = new Discussion({
  title: 'Destroying the one ring',
  content: "Let's brainstorm ideas for destroying the one ring",
  author: 'Gandalf'
})

const frodoComment = new Comment({ 
  author: 'Frodo', 
  content: 'One idea is to throw it into a volcano. What does everyone think?'
})


console.log(frodoComment.getCreatedAt())
oneRingdiscussion.addComment(frodoComment)
console.log(frodoComment === oneRingDiscussion.getCommentAtIndex(0))
// => true

```
The code above implements a parent class `Post` and its two child classes `Discussion` and `Comment`. We might imagine that this code drives an online discussion forum. `Post` has three properties `author`, `content` and `createdAt` and one method `getCreatedAt()`. When we define `Comment` and `Discussion` we use the `extends` keword to inherit `Post`'s properties and the `getCreatedAt()` method. These child classes can also implement their own properties and methods.

Inside each of the child classes' `constructor()` we can see the usage of `super`:
```js
// class definition
constructor(options) {
  super(options)
  // more constructor code
}

```
The `super(options)` call respresents *the parent class's contructor method*:
```js
class Post {
  constructor(options) {
    const { author, content } = options
    this.author = author
    this.content = content
    this.createdAt = Date.now()
  }
// more code
```
This means that whenever we instantiate a `Comment` or `Discussion` passing in our options object we also register it with `author`, `content` and `createdAt` properties. 

## Applications

React.js uses a `Component` class for [one of its methods](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) for creating UI components.

## Further Information

  * [MDN - Classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)
  * Dan Abramov outlines some [best practices](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4#.wdmybk5py) for using classical inheritance in Javacript
