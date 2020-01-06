const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./build/webpack.dev');

const compiler = webpack(webpackConfig);

const { getLastSentencesRequest, flipRequest } = require('./apiMethods');


app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));


// // API METHODS

app.use(bodyParser.json());

app.get('/getLastSentences', getLastSentencesRequest);

app.post('/flip', flipRequest);


// ////

const server = app.listen(3000, 'localhost', () => {
  const address = server.address();

  console.log('App listening at http://%s:%s', address.address, address.port);
});
