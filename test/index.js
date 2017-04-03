const tape = require("tape");
const td = require("testdouble");
const app = require("./dummy/dist/app");

function assertTD(msg, t, fn) {
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
    "Proxies are not supported in this test environment. " +
      "Tests must be run in an environment with Proxy support."
  );
}

tape("Proxies existing class names", t => {
  const error = td.replace(console, "error");
  t.equal(
    app.warning.locals.red,
    "red-hashed",
    "Proxy is transparent to existing class names (warning mode)"
  );

  t.equal(
    app.failing.locals.blue,
    "blue-hashed",
    "Proxy is transparent to existing class names (failing mode)"
  );

  assertTD("console.error was not called", t, () => {
    td.verify(error(), { times: 0, ignoreExtraArgs: true });
  });

  td.reset();
  t.end();
});

tape("Warns about missing class names by default", t => {
  const error = td.replace(console, "error");
  t.equal(
    app.warning.locals.green,
    undefined,
    "missing class name results in undefined"
  );

  const msg = "console.error was called with the class name and the filename";
  assertTD(msg, t, () => {
    td.verify(error(td.matchers.contains(".green")));
    td.verify(error(td.matchers.contains("warning.css")));
  });

  td.reset();
  t.end();
});

tape("Fails on accessing missing class name with `failing` option", t => {
  t.throws(
    () => app.failing.locals.green,
    /\.green.*?failing\.css/,
    "an error is thrown with the class name and the filename"
  );

  t.end();
});
