CommonJS spec - allows you to _require_ other JS files. Node follows this spec

NPM hosts modules which we can install, then require in.

NPM reads `package.json` file in the root of your project.

Of particular interest are the `scripts` and `dependencies` properties.

Useful npm commands to understand:

  - `npm install` - installs all the dependencies listed in your `package.json` file in a `node_modules` folder
  - `npm start` - https://docs.npmjs.com/cli/start
  - `npm run test` - looks for a script in your `package.json` called 'test' (in this example) and runs it

Notes:

  - If you want to reinstall your `node_modules`, you can first delete them away with `rm -rf node_modules`.
  - Prevent your `node_modules` folder from being committed by adding it to your `.gitignore` file.
  - To learn more about the `.gitignore` file, read some docs: https://git-scm.com/docs/gitignore
  - See how another project has used its `.gitignore` file: https://github.com/ssbc/patchwork

