var fs = require('fs');
var querystring = require('querystring');
var url = require('url')
function login(req, res) {
  fs.readFile('index.html', function (error, data) {
    if (error) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("服务器的 HTML 文件加载失败");
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8;' });
      res.write(data.toString());
      res.end();
    }
  });

}
function welcome(req, res, postData) {
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8;' });
  res.write('欢迎你，' + querystring.parse(postData).username);
  res.end();
}

function style(req, res) {
  fs.readFile('style.css', function (error, data) {
    if (error) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("服务器的 CSS 文件加载失败");
    } else {
      res.writeHead(200, { 'Content-Type': 'text/css;charset=utf8;' });
      res.write(data.toString());
      res.end();
    }
  });
}

exports.login = login;
exports.welcome = welcome;
exports.style = style;