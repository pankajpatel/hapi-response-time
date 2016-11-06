var Lab = require("lab");           // load Lab module
var lab = exports.lab = Lab.script(); //export test script
var Code = require("code");      //assertion library
var server = require("./server");

lab.experiment("Header Tests", function() {
  // tests
  lab.test("GET /john should have time Headers", function(done) {
    var options = {
      method: "GET",
      url: "/john"
    };
    // server.inject lets you simulate an http request
    server.inject(options, function(response) {
      Code.expect(response.headers['x-req-start']).to.be.a.number();  //  Expect header x-req-start to be a number
      Code.expect(response.headers['x-res-end']).to.be.a.number();  //  Expect header x-res-end to be a number
      Code.expect(response.headers['x-response-time']).to.be.a.number();  //  Expect header x-response-time to be a number
      Code.expect(response.result).to.have.length(11); // Expect result to be "Hello John!" (11 chars long)
      server.stop(done);  // done() callback is required to end the test.
    });
  });

  lab.test("GET /timeout should have responsi time more than 1 sec", function(done) {
    var options = {
      method: "GET",
      url: "/timeout"
    };

    server.inject(options, function(response) {
      Code.expect(response.headers['x-req-start']).to.be.a.number();
      Code.expect(response.headers['x-res-end']).to.be.a.number();
      Code.expect(response.headers['x-response-time']).to.be.a.number();
      Code.expect(response.headers['x-response-time']).to.be.at.least(1000);
      Code.expect(response.result).to.have.length(23);
      server.stop(done);
    });
  });
});
