// https://github.com/wesbos/Learn-Redux-Starter-Files/blob/master/learn-redux/devServer.js

const express = require('express');

const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);


app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

const server = app.listen(3000, function() {
    const address = server.address();

    console.log('App listening at http://%s:%s', address.address, address.port);
});