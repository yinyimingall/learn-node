const http = require('http')
const url = require('url')
const server = http.createServer( (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  let urlObj = url.parse(req.url, true)
  let d = new Date(urlObj.query.iso)
  if(urlObj.pathname === '/api/parsetime'){
    let time = {
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds()
    }
    res.end(JSON.stringify(time))
  }else if(urlObj.pathname === '/api/unixtime'){
    res.end(JSON.stringify({ "unixtime": d.getTime() }))
  }
})
server.listen(process.argv[2])
