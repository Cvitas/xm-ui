const path = require("path");
const ROOT_PATH = path.resolve(__dirname);
const webpack = require("webpack");

module.exports = {
    entry: {
        index: ["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].commom.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {test: /\.vue$/, use: [{loader: 'vue-loader'}]},
            {test: /\.js$/, exclude: /node_modules/, use: [{loader: 'babel-loader'}]},
            {test: /\.css/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}]},
            {test: /\.less/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}]},
            {test: /\.(png|jpg|gif|jpeg)$/, use: [{loader: 'url-loader?limit=2000&name=img/[name].[ext]'}]},
            {test: /\.json$/, use: [{loader: 'json-loader'}]},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{loader: 'url-loader?limit=10000&minetype=application/font-woff'}]
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{loader: 'file-loader'}]},
        ],
    },
    resolve: {
        extensions: ['.js', '.vue'], //后缀名自动补全
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    /*devServer: {
        contentBase: path.join(__dirname, "build"),
        host: "192.168.199.185",
        compress: true,
        port: 9000,
        proxy: [{ // proxy URLs to backend development server
            context: ["/rms"],
            target: "http://192.168.199.185:8080",
        }],
    },*/
    devtool: 'inline-source-map'
};