CommonJS is a specification which allows you to _require_ other JavaScript files: to pull them into your code and use their contents. Node follows this specification.

npm is a package manager. [npmjs.com](https://www.npmjs.com) hosts packages which we can install, then require in.

npm reads the `package.json` file in the root directory of your project. It contains one JSON object which is used to provide configuration. Of particular interest are the `scripts` and `dependencies` properties.

Useful npm commands to understand:

  - `npm install` - installs all the dependencies listed in your `package.json` file in a `node_modules` folder
  - [`npm start`](https://docs.npmjs.com/cli/start) - usually used to launch a server or other continuous development/debugging environment
  - [`npm test`](https://docs.npmjs.com/cli/test) - usually used to launch your test suite
  - `npm run foo` - looks for a script in your `package.json` called 'foo' (in this example) and runs it

Notes:

  - If you want to reinstall your `node_modules`, you can first delete them away with `rm -rf node_modules`.
  - Prevent your `node_modules` folder from being committed by adding it to your `.gitignore` file.
  - To learn more about the `.gitignore` file, read [the docs](https://git-scm.com/docs/gitignore)
  - See how another project has used its `.gitignore` file: https://github.com/ssbc/patchwork

