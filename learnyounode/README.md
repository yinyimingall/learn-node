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

## JUGGLING Async

## time server

## HTTP file server

## HTTP uppercaserer

## HTTP JSON API server
