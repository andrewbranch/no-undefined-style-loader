var path = require("path");

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
        test: /\.css$/,
        use: [
          {
            loader: "no-undefined-style-loader"
          },
          {
            loader: "css-loader",
            options: { modules: true }
          }
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
