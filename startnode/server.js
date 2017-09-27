var http = require('http');
var url = require('url');

function start(route, handleMap) {
  function onRequest(req, res) {
    console.log('onRequest');
    var pathname = url.parse(req.url).pathname;
    var postData = '';
    req.setEncoding("utf8");
    req.addListener('data', function (postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" +
        postDataChunk + "'.");
    });
    req.addListener('end', function () {
      route(pathname, handleMap, req, res, postData)
    });
  }

  http.createServer(onRequest).listen(3001);
  console.log('Server has started. greet!');
}

exports.start = start;