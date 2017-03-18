var webpack = require('webpack');
var publicPath = "http://localhost:8888/";
var path = require("path");

module.exports = {
    entry: {
        app: [
            "webpack-dev-server/client?" + publicPath,
            "./test/demo.ts"
        ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "test"),
        publicPath: publicPath
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },
    externals: {
        THREE: 'window.THREE'
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }]
    }
};
