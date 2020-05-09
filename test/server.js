'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server();

try {
    server.register({
        plugin: require('../index')
    });

    server.route([
        {
            method: 'GET',
            path: '/john',
            handler: (req, h) => h.response('Hello John!'),
        }, {
            method: 'GET',
            path: '/timeout',
            handler: async function (request, h) {
                await (() => new Promise(
                    resolve => setTimeout(resolve, 1000)
                ))();
                return h.response('Response after 1 second');
            }
        }
    ]);
} catch (error) {

    console.log(error);
  process.exit(1);
}

module.exports = server;
