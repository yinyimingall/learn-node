const fs = require('fs')
const path = process.argv[2]
let suffixName = process.argv[3]
let pattern = /\.(\w*)/
fs.readdir( path, (err, list) => {
  list.forEach( val => {
    if(val.match(pattern)[1] === suffixName){
      console.log(val)
    }
  })
})
