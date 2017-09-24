const fs = require('fs')
let str = fs.readFileSync(process.argv[2]).toString()
let arr = str.split('\n')
console.log(arr.length)
