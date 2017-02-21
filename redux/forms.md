Sometimes forms in React can seem a bit clumsy, with lots of messing around in the component state. Several libraries have been developed which attempt to address the problem by keeping the form in the Redux store. [Redux Form](http://redux-form.com/6.5.0/) is perhaps the best-known of these. We're going to show you how to use [React Redux Form](https://github.com/davidkpiano/react-redux-form) (RRF) which in some ways is a little easier to get your head around!


## First looks

Here's an example of a very simple RRF form:

```js
import { Control, Form } from 'react-redux-form'

// ...

  render () {
    return (
      <Form model="user"
        onSubmit={this.handleSubmit}>

        <label>First name:</label>
        <Control.text model=".firstName" />

        <button type="submit">Add</button>
      </Form>
    )
  }
```

Notice a few things about this:

 - First, instead of an ordinary `<form>` tag, we're using a `<Form>` component provided by RRF.
 - Instead of `<input type="text">` we're using `<Control.text>`.
 - The button is just an ordinary `<button>` with type 'submit'.
 - Each component has a `model` prop which determines what data in the store it refers to
 - the `<Form>` component also has an `onSubmit` prop which calls a function


## Models

RRF models are just objects with properties that correspond to form fields. The model for the example above would look like this:

```
const user = {
  firstName: ''
}
```

If you look back at the example, you'll see that we can refer to the property as `'.firstName'`. We could also call it `user.firstName`, but the shorthand reads a little cleaner.

What if we wanted to add more form fields? We'd need to add them to our model:

```
const user = {
  firstName: '',
  lastName: '',
  phone: '',
  mobile: ''
}
```

The initial model object is just a bunch of empty string properties, though they can get more complex. 


## createForms

RRF introduces a function called `createForms`. We can pass it an object where each property is a model representing the initial state for a form, just like the `user` model above. So:

```
const user = {
  firstName: '',
  lastName: '',
  phone: '',
  mobile: ''
}

export default createForms({ user })
```

We can nest this inside our existing call to `combineReducers`:

```
// Our existing reducers, managing arrays of objects on the Redux store
import items from './items'
import messages from './messages'

// The form (or forms)
import forms from './forms'

// Combine everything into one reducing function
export default combineReducers({
  items,
  messages,
  ...forms
})
```

This is starting to look pretty tidy. Notice the `...` object spread operator, that's important.

We can also pass reducers directly into `createForms`, but we'll get to that later.


## Components and `onSubmit`

RRF provides its own form components, and associates each with a model:

```js
import { Control, Form, actions } from 'react-redux-form'

export default React.createClass({
  handleSubmit (user) {
    const { dispatch } = this.props
    dispatch(addUser(user))
    dispatch(actions.reset('forms.user'))
  },

  render () {
    return (
      <Form model="user"
        onSubmit={this.handleSubmit}>

        <label>First name:</label>
        <Control.text model=".firstName" />

        <label>Last name:</label>
        <Control.text model=".lastName" />

        <label>Mobile:</label>
        <Control.text model=".mobile" />

        <button type="submit">Add</button>
      </Form>
    )
  }
})

```

In the function called by `onSubmit`, any number of dispatch calls can be made (including `actions.submit` which takes a model name and a promise-returning function. We can make API calls and update the form state depending on the server response (for example, rejecting an image that was too large).

```js
  dispatch(actions.submit('user', api.sendUserToServer))
```


## Edit forms and tracking

What happens when we want to edit an existing resource instead of creating a new one? That's where tracking comes in. First, we add a form by passing in the reducer that manages the things we want to edit. Let's say we want to allow one of our items to be edited:

```
// reducers/forms.js
import items from './items'

const user = {
  // ...
}

export default createForms({ user, items })


// reducers/index.js
import forms from './forms'

export default combineReducers({
  messages
  ...forms
})
```

We've moved the items reducer inside the call to `createForms`. Essentially we're saying:

> I'd like to have a collection of items on my store. I'd also like to have a form that allows me to create a user, and a form that allows me to edit one of the items.

Until we tell RRF about the items, it can't do anything with them. We move any collection that needs to be editable inside the call to `createForms` and out of the main `combineReducers` object.

The form itself will look like this:

```
  <Form model={track('items[]', { id: this.props.id })}
```

Here, instead of passing a string to the `model` prop we pass a `track()` function call. `track` takes two arguments: the name of the property on the store (with square brackets to indicate it's a collection), and an object which describes how to match the particular item we're after. In this case, we are trying to find the item with id matching one passed in via props. The value in the store will be updated in real time.


## Connecting the form

If the form isn't the target component of the `connect` call in a container (a child component, for example) we might need to explicitly connect the component to make `dispatch` available as a prop:

```js
  import { connect } from 'react-redux'

  const UserForm = React.createClass({
    // ...
  })

  export default connect()(UserForm)
```


## `combineReducers`

If our state needs are fairly simple and everything is a form, we could use `combineForms` instead of a combination of `combineReducers` and `createForms`. For example, if our state had a collection of items, and a way to create a single new item:

```
import items from './items'

const item = {
  serialNumber: '',
  description: ''
}

const reducers = combineForms({ items, item })
const store = createStore(reducers)
```

Notice that in this example, `combineForms` takes the place of `combineReducers`. (You can actually use them together, but it's a bit more fiddly and you're probably better off using `createForms` for non-trivial cases.)
