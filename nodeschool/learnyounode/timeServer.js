const net = require('net')
function zeroFill(i){
  return (i < 10 ? '0' : '') + i
}
function now(){
  let d = new Date()
  return d.getFullYear() + '-' +
  zeroFill(d.getMonth() + 1) + '-' +
  zeroFill(d.getDate()) + ' ' +
  zeroFill(d.getHours()) + ':' +
  zeroFill(d.getMinutes())
}
const server = net.createServer( socket => {
  socket.end(now() + '\n')
})
server.listen(Number(process.argv[2]))
