Node comes with a [built in debugger](https://nodejs.org/api/debugger.html) you can use to inspect what is going on in your code.

You can use it by putting `debug` after your node command. For example, `node debug server.js`

You are now in an interactive shell where you can type javascript. Try `1+1` or `console.log('hi')`.

This shell will go through your JavaScript code one line at a time. Type `help` to see all the commands available.

* `help` prints out the options.
* `next` takes you to the next line of code.
* `watch` prints the value of an expression every step forward. For example `watch('myVariable')`.
* `unwatch` will stop watching a variable.
* `cont` will stop going line by line and run until the next break point.
* `setBreakpoint` puts a marker that tells the debugger to stop when it gets to that line `setBreakpoint(10)`
* `clearBreakpoint` removes a breakpoint. For example `clearBreakpoint('file-name.js', 10)`.
* `repl` launches a full JavaScript REPL where you can view any variables in your code.

Another useful way to specify a breakpoint in your code is by putting `debugger` in your JavaScript.

```js
1: function createBoard(length) {
2:   const board = []
3:   debugger
4: }
```

Now anytime the debugger gets to line 3 it will automatically stop.


## Node Inspector

Being able to step through your code in a terminal-type of environment is useful, but the debugging tools available inside of your browser are much more powerful. Node Inspector gives you the ability of using the power of using your browser's development tools to debug your server-side Node application. Think about that for a minute. Yes, this is very cool. To use Node Inspector, install and run it in a terminal window or tab.

```sh
npm install -g node-inspector
node-debug server.js
```

Node Inspector also has a nice feature that let's you change your live running code and **save** it back to the source file. To turn this on, run it like this: `node-debug server.js --save-live-edit=true`. Keep in mind that an easier way to do this is to an a script in your `package.json`:

```js
...
"scripts": {
  "debug": "node-debug server.js --save-live-edit=true"
}
...
```

This can be run in your terminal using `npm run debug`.


## Nodemon

Often when you're debugging, it's useful to be able to make changes and see the results of those changes. In these times, having to stop and restart the server becomes tedious pretty quickly. While Node Inspector's `--save-live-edit` might work for you, another option could be to have the server automatically restart whenever one of its files are changed. This is what Nodemon does.

To use Nodemon, install it and use it like this:

```sh
npm install -g nodemon
nodemon server
```


## Better together

Nodemon and Node Inspector can also be used together. This allows you to debug using the rich developer tools in your browser and the application will restart each time you make a change. You can run the terminal commands above in two different terminal windows/tabs, but it is probably easier to create an npm script like this one:

```js
...
"scripts": {
  "debug": "node-inspector & nodemon --debug server.js"
}
...
```

Understanding how to debug your applications with tools more robust than `console.log` put you in the driver seat to explore the entire runtime environment of your application. Be sure you use this capability to increase your understanding.

**Challenge**: try to complete todays exercise without writing a single `console.log` for debugging.

