If you want to do anything more complex that a single command, like including some conditional logic, or loops, you a shell script is what you want.

Make a file called `findTrailingSpace`

```js
#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var currentWorkingDirectory = process.cwd()
var relativePathToFile = process.argv[2] // try logging process.argv to see why we are getting [2]
var targetFile = path.join( currentWorkingDirectory, relativePathToFile )

console.log("finding end of line white space")

fs.readFile( targetFile, 'utf8', function(err, data) {
  if (err) {
    console.log("something went wrong reading ", targetFile)
    console.log("Error", err)
  }

  var lines = data.split('\n')
  var lineNumber = 1

  for (var line of lines) {
    if (line.match(/\s+$/)) {
      console.log( `${lineNumber}: ${line}` )
    }

    lineNumber++
  }
})

```

You can run this by running `node findTrailingSpace somefile` - in this mode this is a javascript script.
Notice unix doesn't care you didn't put `.js` on the end of your filename... while file extensions are polite, if you don't add them, it just doesn't care.

To make this a full shell script we want to make it executable (as in can run it without calling node in front of it all the time)

Do this by running:

```
chmod +x findTrailingSpace
```

(where +x means 'add executeable'. Run `man chmod` to read more about what chmod is about)

Now the terminal will read the first line, determine you want to run the contents with node, so we can run our script by just calling:

```
./findTrailingSpace somefile
```

Extras for experts:
- link the concept of an alias and a script so you can call the script from anywhere
- read about unix _path_ and how to put your script in the path
- check out this link for some more interesting shell scripts [Cool shell scripts](http://intuitive.com/wicked/wicked-cool-shell-script-library.shtml), try and implement them yourself!