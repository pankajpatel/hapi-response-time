var Lab = require("lab");
var lab = exports.lab = Lab.script();
var Code = require("code");
var server = require("./server");

lab.experiment("Header Tests", async () => {
  // tests
  lab.test("GET /john should have time Headers", async () => {
    var options = {
      method: "GET",
      url: "/john"
    };
    // server.inject lets you simulate an http request
    const response = await server.inject(options);
    const headers = response.headers;
    //  Expect header x-req-start to be a number
    Code.expect(headers['x-req-start']).to.be.a.number();

    //  Expect header x-res-end to be a number
    Code.expect(headers['x-res-end']).to.be.a.number();

    //  Expect header x-response-time to be a number
    Code.expect(headers['x-response-time']).to.be.a.number();

    // Expect result to be "Hello John!" (11 chars long)
    Code.expect(response.result).to.have.length(11);
  });

  lab.test("GET /timeout should have responsi time more than 1 sec", async () => {
    var options = {
      method: "GET",
      url: "/timeout"
    };

    const response = await server.inject(options);
    const headers = response.headers;
    Code.expect(headers['x-req-start']).to.be.a.number();
    Code.expect(headers['x-res-end']).to.be.a.number();
    Code.expect(headers['x-response-time']).to.be.a.number();
    Code.expect(headers['x-response-time']).to.be.at.least(1000);
    Code.expect(response.result).to.have.length(23);
  });
});
