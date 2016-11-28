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


## Debugging in the browser and the `--inspect` flag

Historically, one of the most popular debugging tools in Node development was [Node Inspector](https://github.com/node-inspector/node-inspector). More recent versions of Node support the `--inspect` flag, which allows the V8 Inspector to attach to a node process. This means that you can use the Chrome DevTools debugger without the need for Node Inspector (in fact, Node Inspector does not work with Node versions greater than 6.3, and the project appears to have been shelved or abandoned).

Being able to step through your code in a terminal-type of environment is useful, but the debugging tools available inside of your browser are much more powerful. Using `--inspect` gives you the ability to use your browser's development tools to debug your server-side Node application. Think about that for a minute. Yes, this is very cool. To use `--inspect` in your project, add a script in your `package.json`:

```js
"scripts": {
  "debug": "node --inspect server.js"
}
```

This can be run in your terminal using `npm run debug`. You'll see a console notification that looks like this:

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=localhost:9229/node
```

Copy/paste that URL into your browser to start debugging. (If you want the debugger to stop on the very first line of code, you can add the `--debug-brk` flag to your script.)

`--inspect` isn't only useful for server-side web development. You can also use it for generic Node modules. However, if you are using it for server-side developement, you'll probably be interested in Nodemon too.


## Nodemon

Often when you're debugging, it's useful to be able to make changes and see the results of those changes. In these times, having to stop and restart the server becomes tedious pretty quickly. While Node Inspector's `--save-live-edit` might work for you, another option could be to have the server automatically restart whenever one of its files are changed. This is what Nodemon does.

To use Nodemon, install it and use it like this:

```sh
npm install -g nodemon
nodemon server
```


## Better together

Nodemon and `--inspect` can also be used together. This allows you to debug using the rich developer tools in your browser and the application will restart each time you make a change. You can run the terminal commands above in two different terminal windows/tabs, but it is probably easier to create an npm script like this one:

```js
"scripts": {
  "debug": "nodemon --inspect server.js"
}
```

Understanding how to debug your applications with tools more robust than `console.log` will put you in the driver seat to explore the entire runtime environment of your application. Be sure you use this capability to increase your understanding.


## Node Monkey

Another debugging tool worth checking out is [Node Monkey](https://github.com/jwarkentin/node-monkey), which provides a way to show server output in the browser console, as well as issue debugging commands to your running program.


**Challenge**: try to complete todays exercise without writing a single `console.log` for debugging!

