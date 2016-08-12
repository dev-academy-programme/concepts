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


console.log(myComment.getCreatedAt())
oneRingdiscussion.addComment(myComment)
```
The code above implements a parent class `Post` and its two child classes `Discussion` and `Comment`. We might imagine that this code drives an online discussion forum. `Post` has three properties `author`, `content` and `createdAt` and one method `getCreatedAt()`. When we define `Comment` and `Discussion` we use the `extends` keword to indicate that these child classes inherit `Post`'s properties and the `getCreatedAt()` method. These child classes can also implement their own properties and methods.

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
meaning that whenever we instantiate a `Comment` or `Discussion` passing in our options object we also register it with `author`, `content` and `createdAt` properties. 

## Applications



### React Components

React.js uses a `Component` class as one method for creating UI components:

```js
import { Component } from 'react'

class Comment extends Component {
  constuctor(props) {
    super(props)
    
    this.state = {
      likeCount: this.props.likeCount || 0
    }
  }

  render() {
    const { author, content, createdAt } = this.props

    return (
      <p>{`At ${createdAt} {author} wrote`}</p>
      <p>{`At ${createdAt} {author} wrote`}</p>


    )
  
  }
}



```




## Further Information

  * [MDN - Classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)

