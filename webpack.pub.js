var path = require("path");
var webpack = require("webpack");
var package = require("./package.json");

module.exports = {
  entry: {
    app: ["./src/index.ts"]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "modifiers.min.js",
    libraryTarget: "umd"
  },

  resolve: {
    extensions: ["*", ".webpack.js", ".web.js", ".ts", ".js"]
  },

  externals: {
    THREE: "window.THREE"
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin({
      banner: `${package.name}-v${package.version}`
    })
  ]
};
