In Javascript, classes have only just been added with ES6.
Check out the docs here : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes, in particular :
  - constructor
  - prototype methods
  - extends  (note sub-classing is another way to say inheritance)
  - super

#### Using classes in your code

You'll need to transpile (convert) your new ES6 standard code into code that all browsers will support.

There's a range of tools, we'll use the babel family of tools a bunch:
- [babelify](https://www.npmjs.com/package/babelify) : a tranform the teaches Browserify how to use Babel before it bundles all your files
- [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) : a preset for babel to read - make sure you add a `.babelrc`
- [babel-tape-runner](https://www.npmjs.com/package/babel-tape-runner) : knows how to run your tape tests with babel

Also remember to replace your `module.exports` with the new [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

```js
module.exports = OrangeTree

export default OrangeTree      // this one will be imported by a plain import
export {pruneTree}             // this one will have to be imported by name
```

Similarly replace your requires with [import](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import)

```js
var OrangeTree = require('../OrangeTree')

import OrangeTree from '../OrangeTree'
import {pruneTree} from '../OrangeTree'

```