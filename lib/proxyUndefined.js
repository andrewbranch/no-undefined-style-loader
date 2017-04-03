module.exports = function(obj, filename, fail) {
  if (typeof Proxy !== "function") {
    console.warn(
      "Proxies are not available in this environment. `no-undefined-style-loader` will have no effect."
    );
    return obj;
  }

  return new Proxy(obj, {
    get: function(target, name) {
      if (!target.hasOwnProperty(name)) {
        var error = "CSS class `." +
          name +
          "` not found in `" +
          filename +
          "`.";
        if (fail) {
          throw new Error(error);
        } else {
          console.error("Warning: " + error);
        }
      }

      return target[name];
    }
  });
};
