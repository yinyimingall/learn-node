var server = require('./server');
var router = require('./router');
var reqHandlers = require('./reqHandlers');

var handleMap = {
  '/': reqHandlers.login,
  '/login': reqHandlers.login,
  '/welcome': reqHandlers.welcome,
  '/style.css': reqHandlers.style
}

server.start(router.route, handleMap);