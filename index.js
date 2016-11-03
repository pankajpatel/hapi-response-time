var package = require('./package')

var Plugin = {};
Plugin.register = function(server, options, next) {
  server.route({
    method: options.method,
    path: options.path + '/{*}',
    handler: {
      proxy: {
        mapUri: function (request, callback) {

          var headers = {
            'X-Req-Start': (new Date()).getTime()
          };

          var uri = server.info.uri + request.url.path;
          callback(null, uri, headers);
        },
        onResponse: function (err, res, request, reply) {

          reply(res).header('X-Res-End', (new Date()).getTime()).header('X-Res-End', (new Date()).getTime());
        }
      }
    }
  });
};

Plugin.register.attributes = {
  name : pachage.name,
  version : package.version
};
module.exports = Plugin;



