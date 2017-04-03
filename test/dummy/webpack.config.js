var path = require("path");

var cssLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    localIdentName: "[local]-hashed"
  }
};

module.exports = {
  context: __dirname,
  entry: "./app",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    library: "app",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /warning\.css$/,
        use: [
          {
            loader: "no-undefined-style-loader"
          },
          cssLoader
        ]
      },
      {
        test: /failing\.css$/,
        use: [
          {
            loader: "no-undefined-style-loader",
            options: { fail: true }
          },
          cssLoader
        ]
      }
    ]
  },
  resolveLoader: {
    alias: {
      "no-undefined-style-loader": path.resolve(__dirname, "../../index.js")
    }
  }
};
