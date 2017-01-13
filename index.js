var Plugin = {};
Plugin.register = function(server, options, next) {
  server.ext('onRequest', function (request, reply) {
      request.headers['x-req-start'] = (new Date()).getTime();
      return reply.continue();
    });
  server.ext('onPreResponse', function (request, reply) {
      var start = parseInt(request.headers['x-req-start']);
      var end = (new Date()).getTime();
      if(!request.response.isBoom){
        request.response
        .header('x-req-start', start)
        .header('x-res-end', end)
        .header('x-response-time', end - start)
      }
      return reply.continue();
    });
  next();
};

Plugin.register.attributes = {
  pkg: require('./package')
};

module.exports = Plugin;
