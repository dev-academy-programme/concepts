On Monday we used console.log to assert wether our functions were working. This is ok in some situations, but quite restrictive. Luckily, lots of people have written lots of tools/modules to make testing a much easier experience.

One of these is a framework called Tape, which is pretty awesome.

Here's a basic Tape setup:

```js
var test = require('tape')

test("test some basic js", function(t) {
  t.true( 2+2 == 4 , "addition works" )
  t.equal( 3*3 , 9, "multiplication works" )

  result = ['dave', 'sharon'].push('flora')
  t.deepEqual( result, ['dave', 'sharon', 'flora'], "pushing to arrays works" )

  t.end()
}
```

You'll probably want to pretty it up with one of the recommended modules on the Tape website, for example `tap-spec` which turns tests red when they fail, and green when they pass. Remember, *red | green | refactor*!

Have a look at this [simple demo]({{ book.cohort }}tape-demo) of a Tape setup if you want to have a quick play yourself.

