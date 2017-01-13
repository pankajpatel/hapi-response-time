# hapi-response-time
Response Time Plugin for HapiJS

This plugin will add following headers to each request. And the time represented is in the UNIX/Epoch time.

> The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z).

```
x-req-start →1484305451729
x-res-end →1484305451738
x-response-time →9
```


- `x-req-time`: The time on which request is received on server
- `x-res-end`: The time before sending the response
- `x-response-time`: The difference between above two, i.e. the time taken by server to process the request before sending the response

To use this plugin:

- Install
```sh
npm i -S hapi-response-time
```

- and register it with the hapi's `server` instance:
```js
server.register(require('hapi-response-time'), (err)=> {
    if(err) {
      throw err;

    }
})
```

Example:

```sh
npm i -S hapi hapi-response-time
```

```js
var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000
});
server.register(require('hapi-response-time'), (err) => {
  if(err) {
    throw err;
  }
})

server.route([
  {
    method: 'GET',
    path: '/john',
    handler: function(req, reply) {
      reply('Hello John!');
    }
  },{
    method: 'GET',
    path: '/timeout',
    handler: function (request, reply) {
      setTimeout(function() {
        reply('Response after 10 seconds')
      }, 10000);
    }
  }
]);
```
