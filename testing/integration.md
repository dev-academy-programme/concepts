Automated integration testing treats the application like a black box and tests the graphical user interface (GUI) directly to assert it is displaying and behaving exactly like it should for a user. To do this, it launches a browser, navigates to the application, and interacts with the user interface (UI) the same way a user would. However, it does this automatically according to the instructions we give it - hands free!

This type of testing is very different from unit testing. Unlike unit testing, integration testing determines how well all parts of an application are working together instead of directly testing small units of code. 

Let's get an integration test passing. First, let's get the dependencies installed. In your terminal, navigate to the folder of an existing Node.js application that has a web UI. If you don't have an existing `package.json`, run `npm init` before proceeding. Now install our test runners and the stand-alone Selenium server:

```sh
npm install tape --save-dev
npm install webdriverio --save-dev
npm install selenium-standalone@latest -g
selenium-standalone install
```

Now let's write a tests called `integration.js`:

```js
var test = require('tape')
var webdriverio = require('webdriverio')

var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
}

webdriverio
  .remote(options)
  .init()
  .url('http://localhost:3000')
  .getText('.welcome').then(testWelcome)
  .end()

function testWelcome (text) {
  test('the homepage is welcoming', function (t) {
    t.equals(text, 'Hi')
    t.end()
  })
}
```

This test assumes there is an element with a class named `welcome` and the text of the element is `Hi`. Feel free to change the class and text to match your application. This is a very simple tests. **Much** more complex tests are possible.

In a terminal window or tab, start your Node application (e.g. `node server.js`).

In a different window or tab, start the Selenium server by running: `selenium-standalone start`

And in a third terminal window or tab run the test: `node integration.js`

You should see Firefox launch briefly and the test pass.

This is only a small introduction to integration testing. After getting an initial test passing, you should read the WebdriverIO and Selenium documentation to explore all of the possibilities.

