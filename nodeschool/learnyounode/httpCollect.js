const http = require('http')
let url = process.argv[2]
let collection = ''
http.get(url, res => {
  res.setEncoding('utf8')
  res.on('data', data => {
    collection += data
  })
  res.on('end', () => {
    console.log(collection.length)
    console.log(collection)
  })
})
