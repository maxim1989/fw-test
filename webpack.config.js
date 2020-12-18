const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "main.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true,
        before: function (app, _server, _compiler) {
            app.get('/api/people', function (_req, res) {
                res.json({
                    users: [{
                        id: 1,
                        name: 'Alla',
                        surname: 'Aleshina',
                        age: 22
                    }, {
                        id: 2,
                        name: 'Alex',
                        surname: 'Ivanov',
                        age: 24
                    }, {
                        id: 3,
                        name: 'Vera',
                        surname: 'Onix',
                        age: 32
                    }, {
                        id: 4,
                        name: 'Vlad',
                        surname: 'Aleshin',
                        age: 22
                    }]
                });
            });
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};