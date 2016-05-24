Reading and writing files on the filesystem (the hard drive) is a common asynchronous operation. Node.js provides both synchronous and asynchronous functions to read and write files. You can see this in the documentation for [`readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) (the async version) and [`readFileSync`](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options) (the synchronous version). As you can see from the documentation for the [`fs`]() module, it provides a _lot_ of functionality.

Filesystem access is part of a broader type of operations called **IO**, which stands for Input/Output. IO also includes accessing databases and communicating on a network. We're spending most of our time using the HTTP protocol when communicating over networks, but IO includes all protocols and data formats, and databases. All IO operations should be performed asynchronously because they often take much longer than performing the in-memory tasks most of our application is written to do.

Most of our web development work will not include operating on files. Most of it will involve databases and network communication. However, filesystem operations provide a great precursor into the asynchronous programming practices we'll apply with databases and networking, without having to understand the surrounding technology. The added benefit is understanding how to work with files, which is _very_ handy when programming local scripts.


### Reading a text file

To read a text file, we need the path to the file we want to read. In the example below, we're using the `path.join` function to create the path to the `students.json` file.

```js
// Include modules provided by Node.js
var fs = require('fs')
var path = require('path')

function readAsync () {
  var studentsFile = path.join(__dirname, 'students.json')
  fs.readFile(studentsFile, showContents)
}

function showContents (err, buffer) {
  if (err) {
    return console.log(err.message)
  }
  var studentJson = buffer.toString()
  console.log(studentJson)
}
```

The contents of the file, `buffer`, will be passed into our error-first callback function. We're console logging the contents if no error was provided.


### Writing a text file

To write a text file, we need the path we want to create and the contents we want for the file.

```js
// Include modules provided by Node.js
var fs = require('fs')
var path = require('path')

function writeAsync () {
  var teacherFile = path.join(__dirname, 'teacher.json')
  var teacherJson = JSON.stringify({name: 'Don'})
  fs.writeFile(teacherFile, teacherJson, function (err) {
    if (!err) {
      verifyExists(teacherFile)
    }
  })
}

function verifyExists (teacherFile) {
  fs.exists(teacherFile, function(exists) {
    console.log(teacherFile, 'exists:', exists)
  }))
}
```

Instead of having to create a string buffer, the `writeFile` function will also accept just a normal string, which is returned from `JSON.stringify`. The anonymous function we're using as our error-first callback only accepts an error because there isn't anything else to return. If no error is provided we use `fs.exists` to determine if the file was created.

