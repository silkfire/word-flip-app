// https://github.com/wesbos/Learn-Redux-Starter-Files/blob/master/learn-redux/devServer.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);

const { getLastSentences, flip } = require('./apiMethods.js');


app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));



//// API METHODS 

app.use(bodyParser.json());


const createResponse = (expressResponse) => (error, response, body) => expressResponse.json({
                                                                                              error: error && 'Failed to connect to the  WebFlip API.' || response.statusCode != 200 && (body[''] || body.error || 'Operation failed.'),
                                                                                              body:  response && response.statusCode == 200 && body
                                                                                            });

app.get('/getLastSentences', (req, res) => getLastSentences(createResponse(res)));

app.post('/flip', (req, res) => flip(req.body, createResponse(res)));

//////




const server = app.listen(3000, function() {
    const address = server.address();

    console.log('App listening at http://%s:%s', address.address, address.port);
});