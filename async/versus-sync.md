Every function in JavaScript is either synchronous or asynchronous. It's important to understand the difference because synchronicity defines how the function behaves to the code that calls it. When your code calls a _synchronous_ function, the function makes your code wait until it's finished before letting the next line run (also called _blocking_). This is true for most of the functions you've called so far, and likely all of the functions you've written so far. An _asynchronous_ function returns control to your code right away while it continues to do its work. This allows your code and the function to be working at the same time, asynchronously. Here are some examples:

```js
console.log('before')
synchConsoleLog('working') // synchronous function
console.log('after')
```

As you would expect, the output to the console will look like:

```
before
working
after
```

Now let's consider an async example:

```js
console.log('before')
asyncConsoleLog('working') // async function
console.log('after')
```

Depending on how long `asyncConsoleLog` takes to execute, the output of this could be: 

```
before
after
working
```

Async functions are appropriate when they are going to take a long time to complete, so the calling code isn't blocked. It turns out that it takes a relatively long time to read or write to the filesystem (the hard drive) and the network (e.g. sending an HTTP request). In these cases, it's common to use async functions.

The calling code often needs to know when the async function has finished its work. It's also common for the async function to return something (a result, error code or status change) which the calling code needs. In JavaScript, there are a number of different ways to approach this issue: callbacks, promises, and generators. We'll get to promises (and maybe generators) later in the course, but callbacks are the easiest to understand and very common.

