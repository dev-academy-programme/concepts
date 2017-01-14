So, now we have components. How do we test them?

User interface or view layer testing is a less well-defined area than unit testing. UI tests are typically thought of as _integration_ tests: they involve an interaction between the component you're testing and various other systems, like the DOM or React itself. It might seem like we're just testing one function, but in reality we're checking to see whether that function produces the correct result when integrated with other moving parts of the app.

Some people think of UI testing as distinct from integration testing. We'll just call it integration testing for the sake of consistency with other parts of the curriculum. During your career in development, you'll discover that people have very strong opinions about testing!


### Enzyme

React has its own testing library, [react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html), but AirBnB created [Enzyme](https://facebook.github.io/react/docs/test-utils.html), a popular alternative which is widely used (even FaceBook links to it at the top of their own testing page).  Enzyme's render methods all return a _wrapper_: an object with a variety of useful functions we can use to make assertions on the rendered components that come back to us.

> Note: [enzyme-examples](https://github.com/dev-academy-challenges/enzyme-examples) has all the tests below included and set up with Webpack. You may find it helpful to clone down and run the tests while you experiment with Enzyme.

Enzyme allows us to render our components in one of three ways, so we can check that what comes back is what we expect. 


#### Shallow

The simplest method is shallow rendering. As its name suggests, this renders only one 'layer' in isolation, without rendering any other child components. This is one of the most common approaches. It reassures us that the behaviour we're testing isn't actually caused by another child component further down the tree.

```js
import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import App from '../client/components/App'

test('<App />', t => {
  // Arrange
  const expected = 'React development has begun!'

  // Act
  const wrapper = shallow(<App />)
  const actual = wrapper.text()

  // Assert
  t.equal(actual, expected)
  t.end()
})
```

A few things to notice here:
 - Even though we don't excplicitly refer to the `React` object, we need to import it in order for the test to work. This is because enzyme expects `React` to be defined, and we're using JSX.
 - The `wrapper` object is returned from a call to `shallow`. This is our rendering operation.
 - We use the `text()` method to get the contents of the rendered component as a string.
 - This test would only work on a very simple app, the starting one in the boilerplate that renders a string to the browser.

How about something a bit more complex? Say we have a `List` component which must create one list item for each array element in the `things` prop. This is a nice, predictable behaviour that makes for a good test:

```js
test('<List /> creates one item for each wombat', t => {
  // Arrange
  const wombats = ['herschel', 'gertrude', 'jemima']
  const expected = 3

  // Act
  const wrapper = shallow(<List things={wombats} />)
  const actual = wrapper.find('li').length

  // Assert
  t.equal(actual, expected)
  t.end()
})
```


### Mount

We use the mount rendering type when we have to test things that rely on the component being mounted as if it would be in a real browser. This lets us test component lifecycle methods (`componentDidMount`, `componentWillUpdate`, etc.) Mount is useful, but more expensive to run: it uses what's called a 'headless' browser, a browser we don't see but which runs in the test code so that the component can be rendered properly in the DOM. We should try to do most of our tests using `shallow`, as it is likely to be faster and nicely isolates the component we want to test.

To check on the lifecycle methods, we can use [Sinon](http://sinonjs.org/). Sinon provides a way of _spying_ on a function! A spy in code is something that can tell us when a function call has taken place. Here's an example checking on a custom function we pass to a component that should be called when one of the `<li>` elements in `<List />` is clicked:

```js
test('<List /> calls moreWombatInfo when item clicked', t => {
  // Arrange
  const spy = sinon.spy()
  const wombats = ['herschel']
  const expected = 1

  // Act
  const wrapper = mount(<List things={wombats} moreWombatInfo={spy} />)
  const li = wrapper.find('li').first()
  li.simulate('click')
  const actual = spy.callCount

  // Assert
  t.equal(actual, expected)
  t.end()
})
```

To get this to work, there are a number of browsers we could test with. The [example repo](https://github.com/dev-academy-challenges/enzyme-examples) uses [tape-run](https://www.npmjs.com/package/tape-run), which makes use of the same [electron](http://electron.atom.io/) technology that Slack is built with. You can also have tape-run use Chrome or other installed browsers to test against.

There is a bit of extra setup required compared to an ordinary unit test: have a look at [test.config.js](https://github.com/dev-academy-challenges/enzyme-examples/blob/master/test.config.js), [index.loader.js](https://github.com/dev-academy-challenges/enzyme-examples/blob/master/test/index.loader.js) and the scripts section of [package.json](https://github.com/dev-academy-challenges/enzyme-examples/blob/master/package.json) to see if you can figure out what's going on. You don't absolutely have to understand every line here in order to start working with the tests!


### Render

The final Enzyme method does a 'static render': it doesn't use the lifecycle or other methods, but unlike shallow rendering, it _does_ render child components. It also uses [Cheerio](https://github.com/cheeriojs/cheerio) to parse the results of the render, which you might remember from earlier adventures in testing. This means you can use any selector that Cheerio provides.

Say, for example, our `<List />` component needs to include a `<Notes />` child component. We can test for this like so:

```js
test('<List /> includes a <Notes /> component', t => {
  // Arrange
  const wombats = ['herschel']
  const expected = true

  // Act
  const wrapper = render(<List things={wombats} />)
  const actual = wrapper.find('div.notes').length > 0

  // Assert
  t.equal(actual, expected)
  t.end()
})
```

Notice that if you change `render` to `shallow`, the test will fail because shallow only renders the component you pass to it, not its children.


### Avoid 'brittle' tests

It's very easy to take this kind of testing too far. We should test parts of the view that we know are essential to its correct operation. We should try to avoid testing minor details of view and layout that might change frequently. For example, if our test depends on there being a full-stop at the end of the page title and a designer later decides to take it out, our test will break for no good reason! This creates more work for the developer, and doesn't add much value.


### How many?

Different projects will have different needs, but as a general rule we should probably write:

 - lots of unit tests
 - some integration tests that cover our API and/or database code
 - a smaller number of integration tests that cover our UI, focusing on key components

