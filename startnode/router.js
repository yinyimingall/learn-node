function route(pathname, handleMap, req, res, postData){
  if(typeof handleMap[pathname] === 'function'){
    handleMap[pathname](req, res, postData);
  } else {
    console.log('No request handler for ' + pathname);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
}
exports.route = route;