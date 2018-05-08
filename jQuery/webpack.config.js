const path = require("path");

module.exports = (env, argv) => ({
  entry: "./src/index.ts",
  output: {
    library: "jquery",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: argv.mode === "development" ? "jquery.js" : "jquery.min.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader"
        },
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
});
