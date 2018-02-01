'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({ port: 3000 }); // tell hapi which TCP Port to "listen" on

(async () => {
  try {
    await server.register({
      plugin: require('../index')
    });

    server.route([{
      method: 'GET',        // define the method this route will handle
      path: '/john', // this is how you capture route parameters in Hapi
      handler: function(req, h) { // request handler method
      return h.response('Hello John!'); // reply with text.
      }
    },{
      method: 'GET',
      path: '/timeout',
      handler: async function (request, h) {
      await (() => { return new Promise(resolve => setTimeout(resolve, 1000)); })();
      return h.response('Response after 1 second');
      }
    }]
    );
  } catch (error) {
    console.log(error);
	process.exit(1);
  }
})();

module.exports = server;
