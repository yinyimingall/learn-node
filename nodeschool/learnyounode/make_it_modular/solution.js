let filterFn = require('./filter.js')
let dir = process.argv[2]
let filterStr = process.argv[3]
filterFn(dir, filterStr, (err, list) => {
  if(err){
    return console.error('there is an error:', err)
  }
  list.forEach(file => console.log(file))
})
