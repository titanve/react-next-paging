var path = require("path");

var include = path.join(__dirname, "src");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "dist"),
    libraryTarget: "umd",
    library: "ReactNextPaging"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        include
      }
    ]
  }
};
