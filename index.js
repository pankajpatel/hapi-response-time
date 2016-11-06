var package = require('./package');

var Plugin = {};
Plugin.register = function(server, options, next) {
  server.route({
    method: options.method,
    path: options.path + '/{*}',
    handler: {
      proxy: {
        mapUri: function (request, callback) {

          var headers = {
            'x-req-start': (new Date()).getTime()
          };

          var uri = server.info.uri + request.url.path;
          callback(null, uri, headers);
        },
        onResponse: function (err, res, request, reply) {
          var start = request.header('x-req-start');
          var end = (new Date()).getTime();
          reply(res)
            .header('x-req-start', start)
            .header('x-res-end', end)
            .header('x-response-time', end - start);
        }
      }
    }
  });

  next();
};

Plugin.register.attributes = {
  name : package.name,
  version : package.version
};

module.exports = Plugin;
