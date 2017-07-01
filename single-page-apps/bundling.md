# Bundling

The CommonJS pattern that Node uses (which allows us to _require_ modules, or code we've written in other files) is super powerful, but current web browsers don't support it.

One solution is to parse all the require statements and pull the code from each one into a single file. This is called _bundling_, and makes one massive file which the browser can read. (Bundling is also really common with CSS).

Thus, you write all your code in nice, modular files; importing functions and modules from node_modules. Then, before you serve your app, you 'bundle' it - this process takes all the code from your files and squishes it into one, long file which a web browser can read.

There are several different bundling tools. One of those is Browserify, incidentally written by the author of Tape.

![browserify logo](https://camo.githubusercontent.com/e19e230a9371a44a2eeb484b83ff4fcf8c824cf7/687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67)

