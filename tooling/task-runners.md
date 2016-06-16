_Task runners_ provide a way to script certain actions on our project or individual code files. The most notorious of these is [`make`](http://www.gnu.org/software/make/manual/make.html). Make is still relevant but its use in JavaScript applications is rare. Task runners such as [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/) are very common. Task runners perform tasks to prepare our code for production deployments. _Bundlers_ provide a way to collect a number of different files and bundle them into a single file for deployment. But why are these operations needed?

### Why do we need task runners and bundlers?

Over the past 10 years web applications have moved more and more of the logic from the server to the browser. Today the majority of data retrieval, event handling, animation and view composition happens in the browser. To accomplish this we're using additional libraries. 

Until recently, JavaScript hasn't had a consistent way of separating JavaScript code across multiple files so they are easy to manage and easy to resolve dependencies across them:

* Node.js uses CommonJS modules which use `module.exports` and `require`.
* There have been other approaches that are more appropriate for the browser such as AMD (Asynchronous Module Definition).
* The latest version of JavaScript now includes a module syntax for declaring and importing modules.

In order for bundling to work, it needs to be able to locate each of a file's dependencies and understand their relationships.

In addition to the increasing complexity brought on by added functionality and the need to reconcile multiple module loading mechanisms, there are now many languages that _transpile_ to JavaScript such as CoffeeScript, TypeScript, and the latest version of JavaScript, ECMAScript 6/2015. CSS also has intermediary formats that require a _build_ for they can be used in a browser: SASS, LESS and SCSS are a few of the common choices. Transpiling file from these format is one of the jobs of the task runner.

However, even after your code has been bundled, there are usually a couple of other steps that will need to be taken before the code is ready to be deployed and used in an application:

* _Minification_ is the process of removing all unnecessary characters and source code from the original without changing its functionality. This process can require a lot of intelligence about the code.

* _Concatenation_ is like bundling, but perhaps less intelligently. The goal of this process is about reducing the number of HTTP requests performed by the browser in order to get all of the assets needed by the application.

