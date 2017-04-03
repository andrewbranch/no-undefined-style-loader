var tape = require("tape");
var td = require("testdouble");
var app = require("./dummy/dist/app");

function assertTestDoubles(msg, t, fn) {
  try {
    fn();
    t.pass(msg);
  } catch (err) {
    t.comment(err);
    t.fail(msg);
  }
}

if (typeof Proxy !== "function") {
  throw new Error(
    "Proxies are not supported in this test environment. Tests must be run in an environment with Proxy support."
  );
}

tape("Proxies existing class names", function(t) {
  var error = td.replace(console, "error");
  t.equal(
    app.locals.red,
    "red-hashed",
    "Proxy is transparent to existing class names"
  );
  assertTestDoubles("console.error was not called", t, function() {
    td.verify(error(), { times: 0, ignoreExtraArgs: true });
  });

  td.reset();
  t.end();
});

tape("Warns about missing class names by default", function(t) {
  var error = td.replace(console, "error");
  t.equal(
    app.locals.green,
    undefined,
    "missing class name results in undefined"
  );
  assertTestDoubles(
    "console.error was called with the class name and filename",
    t,
    function() {
      td.verify(error(td.matchers.contains(".green")));
      td.verify(error(td.matchers.contains("app.css")));
    }
  );

  td.reset();
  t.end();
});
