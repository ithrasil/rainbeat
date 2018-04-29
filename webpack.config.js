"use strict";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.jsx',
    output: {

        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.resolve('./dist')
    },

    module: {
        rules: [
            {
                test: /\.js[x]$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',  'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    devtool: 'inline-map',

    resolve: {
        alias: {
            Helpers$: path.resolve(__dirname, 'src/helpers.js'),
            Styles$: path.resolve(__dirname, 'src/css/index.scss'),
            Api: path.resolve(__dirname, 'src/api'),
            Actions: path.resolve(__dirname, 'src/actions'),
            Constants: path.resolve(__dirname, 'src/constants'),
            Containers: path.resolve(__dirname, 'src/containers'),
            Reducers: path.resolve(__dirname, 'src/reducers')
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};