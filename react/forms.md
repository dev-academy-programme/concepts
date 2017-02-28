Sometimes forms in React can feel like a bit of a stumbling block, but they needn't be. Like most of the content you've learned so far, with practice they become far less intimidating!


## Where does the data go?

There are various approaches to handling forms, but mostly they boil down to one decision: where do you want to keep the form data?

 - in _component state_ (controlled components)
 - in the _DOM_, using refs (uncontrolled components)
 - in the _Redux store_ (if you haven't encountered Redux yet, don't worry about this one!)

As usual on the Internet, lots of people have very strong opinions about how to write forms! Facebook [recommends](https://facebook.github.io/react/docs/forms.html#alternatives-to-controlled-components) using controlled components for the most part, but not everyone agrees. [This comparison of the approaches](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) is a fair summary.

We suggest not getting too tangled up in the debate. Learn the different ways to work with forms, then pick the one that you think fits your need best. If it ends up not working so well for you, revisit this decision with your team to talk about what could have been improved.

If you want a rule of thumb, here's one:

 - if your form is relatively simple, try using refs;
 - if it's complicated or likely to become so, try using controlled components.


## Uncontrolled components

Here's an example of an uncontrolled component form:

```js
  render () {
    return (
      <form onSubmit={this.handleSubmit}>

        <label htmlFor="name">Name</label>
        <input type="text" ref={name => this.name = name} />

        <label htmlFor="description">Description</label>
        <textarea ref={description => this.description = description} />

        <input type="submit" value="Add" />
      </form>
    )
  }
```

Each form element has a `ref` prop to which is assigned a very short anonymous function, setting whatever is passed to it as a property on `this` (the component). Using this approach, the value is grabbed from the element on the DOM and assigned to the component. We don't have to define `this.name` and `this.description`, they're just places to keep the form data until we're ready to submit it. (Although you should take care not to choose names like `render` or anything that might conflict with existing properties on your component!)

But here's the thing: there's actually no need for the `<form>` element at all! We could just as easily use something simpler:

```js
  render () {
    return (
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" ref={name => this.name = name} />

        <label htmlFor="description">Description</label>
        <textarea ref={description => this.description = description} />

        <button onClick={this.handleSubmit}>Add</button>
      </div>
    )
  }
```

Let's take a look at how handleSubmit might be defined:

```js
  handleSubmit (evt) {
    evt.preventDefault()

    this.props.addItem({
      name: this.name.value,
      description: this.description.value
    })
  },
```

That `preventDefault` call is to stop the ordinary form submission that the browser will otherwise try to do. If you're seeing your form's input box contents showing up in the URL bar, chances are you forgot to prevent the default form action! (If you don't use the form component at all, this step should be unnecessary.)

The rest of the function is pretty simple: take a function passed down from the parent component as a prop, and pass to it an object with the form values as properties. You can imagine that the form would look like this in the parent component:

```js
  addItem (item) {
    this.setState({
      items: [ ...items, item ]
    })
  },

  render () {
    return (
      <ul>{this.state.items.map(item => (<li>{item.name}</li>))}</ul>
      <p>Add a new item:</p>
      <ItemForm addItem={this.addItem} />
    )
  }
```


## Controlled components

Here's an example showing the same form but using controlled components:

```js
  <form onSubmit={this.handleSubmit}>

    <label htmlFor="name">Name</label>
    <input type="text"
      name="name"
      value={this.state.item.name}
      onChange={this.handleChange}
    />

    <label htmlFor="description">Description</label>
    <textarea
      name="description"
      value={this.state.item.description}
      onChange={this.handleChange}
    />

    <input type="submit" value="Add" />
  </form>
```

Notice that (unlike the uncontrolled example) this one has a `value` prop on each form element. This means that whatever is in the component state at that location will also be shown in the form.


## Change handlers

Each input also has an `onChange` prop which calls the `handleChange` function each time the user types a key. Take a look at how we could define it:

```js
  handleChange (evt) {
    const field = evt.target.name
    this.setState({
      item: {
        ...this.state.item,
        [field]: evt.target.value
      }
    })
  }
```

If you haven't seen this sort of thing before, it's called [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) syntax (combined with the [object spread operator](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html). Whatever string the variable `field` contains will become the property name. So:

```js
  {
    ...this.state.item,
    [evt.target.name]: evt.target.value
  }
```

is just syntactic sugar for:

```js
  const setField = {}
  setField[evt.target.name] = evt.target.value
  Object.assign({}, this.state.item, setField) 
```

After your form submission, the item will look like this in state:

```js
  {
    name: 'Wombat',
    description: 'Awesome furry creature with square poop.'
  }
```


## Submit handlers

All the submit handler really has to do is send the form state back to the parent component. Here we've also reset the form by returning its state properties to empty strings:

```js
  handleSubmit (evt) {
    evt.preventDefault()

    this.props.saveItem(this.state.item)
    this.setState({
      item: {
        name: '',
        description: ''
      }
    })
  }
```

What about validation? Well, we could check each property and make sure it wasn't empty:

```js
  const { name, description } = this.state.item
  if (name.length && description.length) {
    this.props.saveItem(this.state.item)
  }
```

Once it gets much more complex than that, you'll need to decide whether to continue writing your own form logic or relying on an existing library to do it for you.
