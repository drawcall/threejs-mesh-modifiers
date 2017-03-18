var webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: {
        app: ["./src/index.ts"]
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "modifier.js",
        libraryTarget: "umd"
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
    },
    
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
};
