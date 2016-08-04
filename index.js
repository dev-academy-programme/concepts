const parse = require('markdown-to-ast').parse
const pull = require('pull-stream')
const glob = require('pull-glob')
const file = require('pull-file')
const path = require('path')
const toPull = require('stream-to-pull-stream')
const fs = require('fs')
const stream = require('stream')
const Writable = stream.writable

const inputFile = path.resolve(__dirname, './server/static-files.md')
console.log('inputFile', inputFile)




pull(
  file(inputFile),
  pull.map(e => e.toString()),
  pull.map(parse),
  pull.drain(asts => {
    console.log(asts)
  })
)

