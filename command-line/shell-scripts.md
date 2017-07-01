# Shell scripts

If you want to do anything more complex that a single command, like including some conditional logic, or loops, a shell script is what you want. And you can create them in JavaScript.

Make a file called `findTrailingSpace`:

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

You can run this by running `node findTrailingSpace somefile`. In this mode, this is a JavaScript script. Notice that Unix doesn't care that you didn't put `.js` on the end of your filename. While file extensions are polite, if you don't add them, your shell doesn't care.

To make this a full shell script, we want to make it executable so we can run it without including `node` in front of it all the time.

Make it executable by running:

```sh
chmod +x findTrailingSpace
```

`+x` means 'add executeable'. Run `man chmod` to read more about what chmod is about.

Now the shell will read the first line (called a hashbang or shebang) to find out what to run the rest of the script with; `node` in our case. Now we can run our script by calling:

```
./findTrailingSpace somefile
```

More to consider:

- Link the concept of an alias and a script so you can call the script from anywhere.
- Read about the Unix _path_ and how to put your script in the path.
- Check out this link for more interesting shell scripts: [Cool shell scripts](http://intuitive.com/wicked/wicked-cool-shell-script-library.shtml). Have a go at implementing them yourself.

