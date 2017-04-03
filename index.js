var path = require("path");
var loaderUtils = require("loader-utils");

module.exports = function(source) {
  var options = loaderUtils.getOptions(this) || {};
  var fail = Boolean(options.fail);
  var pathToProxy = JSON.stringify(
    path.resolve(__dirname, "lib", "proxyUndefined")
  );
  var args = ["exports.locals", JSON.stringify(this.resourcePath), fail].join(
    ", "
  );

  return [
    source,
    "",
    "// no-undefined-style-loader",
    "var proxyUndefined = require(" + pathToProxy + ");",
    "exports.locals = proxyUndefined(" + args + ");"
  ].join("\n");
};
