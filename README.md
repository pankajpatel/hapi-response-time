# hapi-response-time

[![Build Status](https://travis-ci.com/pankajpatel/hapi-response-time.svg?branch=master)](https://travis-ci.com/pankajpatel/hapi-response-time)

<img src="https://cloud.githubusercontent.com/assets/251937/26471448/0c5f3268-41a2-11e7-850a-cbe109e18f12.png" alt="hapi-response-time" height="150" style="float:right">

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
await server.register(require('hapi-response-time'));
```

Example:

```sh
npm i -S hapi hapi-response-time
```

```js
var Hapi = require('hapi');
var server = new Hapi.Server({
  port: process.env.PORT || 3000
});

await server.register(require('hapi-response-time'));

server.route([
  {
    method: 'GET',
    path: '/john',
    handler: function(req, h) {
      return h.response('Hello John!');
    }
  },{
    method: 'GET',
    path: '/timeout',
    handler: async function (request, h) {
      await (() => { return new Promise(resolve => setTimeout(resolve, 10000)); })();
      return h.response('Response after 10 seconds');
    }
  }
]);
```
