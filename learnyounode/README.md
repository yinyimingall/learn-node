# learnyounode
## baby steps
### 全局process 对象
process对象有一个`argv`属性，通过`process.argv`可获得命令行参数的一个数组

i.e `console.log(process.argv)` 控制台输出 ['node目录', 'js执行目录', arg1, arg2, ...]

my solution
```js
let sum = 0;
for(let i = 2; i < process.argv.length; i++){
  sum += parseInt(process.argv[i])
}
console.log(sum)
```
officail solution
```js
var result = 0
for (var i = 2; i < process.argv.length; i++) {
  result += Number(process.argv[i])
}
console.log(result)
```
Thinking：
* `Number`对象是数值的包装对象，可用于构造函数和工具函数。这里作为工具函数使string类型转化为number类型
* `parseInt`是全局方法，将字符串转换为整数

## my first I/O
未理解

如果你在想如何更简单地去计算行数，请回想一下，一个 JavaScript
  字符串，可以使用 .split() 分割成子字符串数组，而且，'\n'
  可以作为分隔符。注意，供测试的文件末尾的最后一行并没有进行换行，即没有
  '\n' 的存在，因此，使用这个方法的话，所得的数组的长度会比行数多一个。
### fs 模块
通过 `const fs = require('fs')`引入fs模块

所有同步读写文件操作的方法在fs模块里都以`Sync`结尾

`fs.readFileSync('/path/objectFile')`会返回一个包含文件所有内容的`Buffer`对象

### Buffer 对象
Buffer对象用来处理数据。无论是ascii还是二进制文件，或其他格式，Buffer可以通过调用toString()方法转为字符串
i.e `var str = buffer.toString()`

my solution
```js
const fs = require('fs')
let str = fs.readFileSync(process.argv[2]).toString()
let arr = str.split('\n')
console.log(arr.length-1)
```
official solution
```js
var fs = require('fs')
var contents = fs.readFileSync(process.argv[2])
var lines = contents.toString().split('\n').length - 1
console.log(lines)
// 只要把 'utf8' 作为 readFileSync 的第二个参数传入
// 就可以不用 .toString() 来得到一个字符串
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
```
## my first Async I/O
异步读取文件，node 风格
my solution
```js
const fs = require('fs')
fs.readFile( process.argv[2], 'utf8', (err, data) => {
  console.log(data.split('\n').length-1)
})
```
official solution
```js
var fs = require('fs')
var file = process.argv[2]
fs.readFile(file, function (err, contents) {
  if (err) {
     return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
```
fs的`readFile(file, function(err, contents))`方法接受文件名和一个回掉函数。回掉函数第一个参数是错误对象，第二个是文件内的全部内容
## filtered LS
my solution
```js
const fs = require('fs')
let path = process.argv[2]
let suffixName = process.argv[3]
let pattern = /\.(\w*)/
fs.readdir( path, (err, list) => {
  list.forEach( val => {
    if(val.match(pattern)[1] === suffixName){
      console.log(val)
    }
  })
})
```
official solution
```js
var fs = require('fs')
var path = require('path')
var folder = process.argv[2]
var ext = '.' + process.argv[3]
fs.readdir(folder, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function (file) {
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
})
```
这里引入了path模块，使用了`extname()`方法

fs的`readdir(path, function(err, fileList))`方法接受路径和一个回掉函数。回掉函数第一个参数是错误对象，第二个是路径下的所有文件名列表数组

## make it modular
使用

    module.exports = function (args) {  }

导出模块

使用

    var mymodule = require('./mymodule.js')

导入模块
#### 尽早捕获错误
```js
function bar (callback) {
      foo(function (err, data) {
        if (err)
          return callback(err) // 尽早返回错误
        // ... 没有错误，处理 `data`
        // 一切顺利，传递 null 作为 callback 的第一个参数
        callback(null, data)
      })
    }
```
solution
```js
// main js
let filterFn = require('./filter.js')
let dir = process.argv[2]
let filterStr = process.argv[3]
filterFn(dir, filterStr, (err, list) => {
  if(err){
    return console.error('there is an error:', err)
  }
  list.forEach(file => console.log(file))
})
```

```js
//a module
const fs = require('fs')
const path = require('path')
module.exports = function(dir, filterStr, callback){
  fs.readdir(dir, function(err, list){
    if(err){
      return callback(err)
    }
    list = list.filter( file => path.extname(file) === '.' + filterStr)
    callback(null, list)
  })
}

```
## HTTP client
### http 模块
http的`get()`方法发起简单GET请求。方法的回掉函数res参数是一个Node的Stream类型的对象，你可以将Node Stream当作一个会触发一些事件的对象。通常我们关心的事件有三个：“data”，“error”以及“end”。

通过

    res.on('data', function(data){ })

来监听数据变化，data事件当数据块到达并且已经可以对其进行处理时被触发
这里的res对象（是个Stream类型对象）有个`setEncoding()`方法，通过这个方法传入参数"utf8"，监听事件回掉函数中的data就会传递为字符串，而非Node Buffer对象。免除了手动toString()

my solution
```js
const http = require('http')
let url = process.argv[2]
http.get(url, res => {
  res.setEncoding('utf8')
  res.on('data', data => {
    console.log(data)
  })
})
```
official solution
```js
var http = require('http')
http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error)
```

## HTTP collect
end事件用来确定stream是否传输完成

my solution
```js
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
```

official solution
```js
var http = require('http')
    var bl = require('bl')
    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })
```
官方方法使用了第三方模块bl（Buffer list）也可以使用concat-stream

通过把response这个stream对象pipe到 bl 或 concat-stream 中，它们会为你收集数据，并且回掉函数上会带上所收集的数据

    response.pipe(bl(function(err, data){ }))
    response.pipe(concatStream(function(data){ }))

注意使用 data.toString() 来吧Buffer 转为字符串

### pipe方法
pipe() 接受一个 destination 目标作为第一个参数，流写入的目标

## JUGGLING Async
verify未通过

my solution
```js
const http = require('http')
let url_1 = process.argv[2]
let url_2 = process.argv[3]
let url_3 = process.argv[4]
let arr = []
let temp = ''
process(url_1, process(url_2, process(url_3, null)))
arr.forEach( val => console.log)
function process(url, callback){
  http.get(url, res => {
    res.on('data', data => {
      temp += data.toString()
    })
    res.on('end', () => {
      arr.push(temp)
      temp = ''
      callback()
    })
  })
}
```

official solution
```js
var http = require('http')
var bl = require('bl')
var results = []
var count = 0
function printResults () {
  for (var i = 0; i < 3; i++) {
    console.log(results[i])
  }
}
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }
      results[index] = data.toString()
      count++
      if (count === 3) {
        printResults()
      }
    }))
  })
}
for (var i = 0; i < 3; i++) {
  httpGet(i)
}
```
对回掉惊醒计数是异步的基础。官方count就是在对回掉函数 printResults 进行计数

第三方库 [async] 或 [after] 实现异步则更加方便
## time server
使用 net 模块实现基础网络功能。使用net创建一个 TCP 服务器。这里和 HTTP 无关

net 的 net.createServer() 方法接受一个回掉函数，这个回掉函数会在服务器每接收到一个TCP连接时被调用，因此回掉可能会被调用很多次。同时 net.createServer() 返回一个 TCP 服务器的实例。通过实例调用 listen() 方法监听端口

一个典型的 Node TCP 服务器
```js
var net = require('net')
     var server = net.createServer(function (socket) {
       // socket 处理逻辑
     })
     server.listen(8000)
```
socket 对象包含了很多关于各个连接的信息（meta-data），但是它也同时是一个 Node 双工流（duplex Stream），所以，它即可以读，也可以写。

socket.write() 可写数据到socket中，socket.end() 用来关闭一个socket，同时接受一个数据参数，表示写完后关闭
solution
```js
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
```
## HTTP file server
创建一个 HTTP 服务而不是普通的 TCP 服务

http.createServer() 接收一个回掉函数作为参数，回调函数会在你的服务器每一次进行连接的时候执行

    function callback (request, response) {  }

request 用来从请求中获取一些的属性，例如请求头和查询字符（query-string)，而 response 会发送数据给客户端，包括响应头部和响应主体

注意 request与response都是 Node stream ！这就是说可以使用流式（streaming）处理所抽象的那些方法来实现发送和接受数据

http.createServer 返回一个 HTTP 服务器的实例，通过 server.listen(portNubmer) 方法监听特定的端口

一个典型的 Node HTTP 服务器：
```js
     var http = require('http')
     var server = http.createServer(function (req, res) {
       // 处理请求的逻辑...
     })
     server.listen(8000)
```
my solution
```js
const http = require('http')
const fs = require('fs')

const server = http.createServer( (req, res) => {
  fs.createReadStream(process.argv[3]).pipe(res)
})
server.listen(process.argv[2])
```

official solution
```js
var http = require('http')
    var fs = require('fs')
    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })
      fs.createReadStream(process.argv[3]).pipe(res)
    })
server.listen(Number(process.argv[2]))
```


## HTTP uppercaserer
through2-map 模块创建一个 transform stream 它通过这个函数完成接收一个数据块，处理后返回数据块的功能。这有点类似与js中的数组 map() 内置方法，而 through2-map 是针对 stream 类型的

    var map = require('through2-map')
    inStream.pipe(map(function (chunk) {
       return chunk.toString().split('').reverse().join('')
    })).pipe(outStream)

official solution
```js
var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))
```
## HTTP JSON API server
两个接口

/api/parsetime?iso=2013-08-10T12:10:15.474Z

返回

    {
       "hour": 14,
       "minute": 23,
       "second": 15
    }

/api/unixtime?iso=2013-08-10T12:10:15.474Z

返回

    { "unixtime": 1376136615474 }

my solution
```js
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
```

official solution
```js
var http = require('http')
var url = require('url')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime: time.getTime() }
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
```

使用了 Node 核心模块 url 来处理 URL和查询参数

url.parse(req.url, true) 会返回一个对象，这个对象有如下属性

    Url {
      protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?q=1',
      query: { q: '1' },
      pathname: '/test',
      path: '/test?q=1',
      href: '/test?q=1' }

正确地为响应设置 Content-Type 属性：

    res.writeHead(200, { 'Content-Type': 'application/json' })

把一个字符串传给Date的构造函数，它也可以帮你将字符串处理成日期类型

响应应该是一个JSON字符串的形式，使用 `JSON.stringify()`方法

end.
