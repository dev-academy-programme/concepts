While exploring the new ES6 syntax, you might consider using the Babel CLI (command line interface) tools. These provide a REPL (read evaluate print loop) interface and let you run files in the terminal. Use npm to install them:

```sh
npm install -g babel-cli
```

See [Babel CLI tools](https://babeljs.io/docs/usage/cli/) for more information.


### Modules

Modules provide a way to separate our code across multiple files. This makes our applications much easier to maintain and easier for multiple developers to work on at the same time. This new language feature does the same thing `module.exports` and `require` perform in the Node.js environment.

To export values, objects, arrays, function, or pretty much anything from a module, just preface it with `export`.

```js
// utility.js
export default function joinStrings (s1, s2) {
  return s1 + ' ' + s2
}
```

This makes it available to _import_. There are multiple ways to import items from modules. To import default values like the `joinStrings` function above:

```js
// app.js
import join from 'utility.js'
var combined = join('pretty', 'cool')
```

For more information, see [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/).


### Variable declaration with `let` and `const`

In ES5, we use `var` to declare variables. Variables declared with `var` are available to the entire function regardless of where it is defined. This is not true for most languages, which have _block-level_ scoping, rather than _function-level_ scoping. `let` and `const` apply block level scoping to JavaScript. This means we can define variables inside `if` statements and `for` loops (and other block constructs) that are not available outside of the blocks they are defined in. `const` defines a variable that cannot be reassigned with a different value. For example:

```js
function testVar () {
  var foo = 44
  if (true) {
    var foo = 13 // same variable
    console.log(foo) // 13
  }
  console.log(foo) // 13
}

function testLet () {
  let foo = 44
  if (true) {
    let foo = 13 // different variable
    console.log(foo) // 13
  }
  console.log(foo) // 44
}
```

For more information, check out [ES6 In Depth: let and const](https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/).


### Arrow functions

Arrow functions are a new syntax to write anonymous functions. So far we've been writing:

```js
var fn = function (op1, op2) {
  return op1 + op2
}
```

With ES6 arrow functions, we can write:

```js
const fn = (op1, op2) => op1 + op2
```

It essentially removes the `function` keyword and places the arrow between the parameters and the body of the function.

Some notes about arrow functions: 

* The parentheses are optional around the parameters if there is only a single parameter. They are required if there are no parameters or more than one.

* Curly braces are optional when the body of the function can fit on one line.

* If there are no curly braces, arrow functions automatically return the result of the statement to the right of the arrow. This is called _implicit_ return.

* If there are curly braces, we still need to use the `return` keyword:

```js
// Doesn't need return
const fn1 = (op1, op2) => op1 - op2

// Needs return
const fn2 = (op1, op2) => { return op1 - op2 }
```

For more information, check out [ES6 In Depth: Arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/).


### Template Strings

String interpolation provides a much nicer way to combine strings and values. We're currently used to concatenating strings when we need to combine them:

```js
var user = {name: 'Kristina'}
var welcome = 'Welcome back ' + user.name + '. Good to see you.'
```

The new syntax is easier to read:

```js
const user = {name: 'Kristina'}
const welcome = `Welcome back ${user.name}. Good to see you.`
```

Notice how the string is deliniated with backticks to indicate it is a template string.

For more information, check out [ES6 In Depth](https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/).

There is a lot more about ES6 to learn, but that is enough for now. Feel free to explore - there are a lot of really nice additions. There are really good resources on ES6/2015 online.
