var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({port: 3000}); // tell hapi which TCP Port to "listen" on
server.register({
  register: require('../index')
});

server.route([{
  method: 'GET',        // define the method this route will handle
  path: '/john', // this is how you capture route parameters in Hapi
  handler: function(req, reply) { // request handler method
    reply('Hello John!'); // reply with text.
  }
},{
  method: 'GET',
  path: '/timeout',
  handler: function (request, reply) {
    setTimeout(function() {
      reply('Response after 1 second')
    }, 1000);
  }
}]
);

module.exports = server;
