var Lab = require("lab");           // load Lab module
var lab = exports.lab = Lab.script(); //export test script
var Code = require("code");      //assertion library
var server = require("./server");

lab.experiment("Basic HTTP Tests", function() {
  // tests
  lab.test("GET /{yourname*} (endpoint test)", function(done) {
    var options = {
      method: "GET",
      url: "/john"
    };
    // server.inject lets you simulate an http request
    server.inject(options, function(response) {
      console.log(response.headers)
      Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
      Code.expect(response.result).to.have.length(11); // Expect result to be "Hello John!" (11 chars long)
      server.stop(done);  // done() callback is required to end the test.
    });
  });
});
