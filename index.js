'use strict';

const plugin = {
    pkg: require('./package.json'),
    register: (server) => {

        server.ext('onRequest', (request, h) => {
            request.headers['x-req-start'] = (new Date()).getTime();
            return h.continue;
        });
        server.ext('onPreResponse', (request, h) => {
            var start = parseInt(request.headers['x-req-start']);
            var end = (new Date()).getTime();
            if (!request.response.isBoom) {
                request.response
                .header('x-req-start', start)
                .header('x-res-end', end)
                .header('x-response-time', end - start)
            }
            return h.continue;
        });
    }
};

module.exports = plugin;
