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

**Challenge**: try to complete todays exercise without writing a single `console.log` for debugging.

