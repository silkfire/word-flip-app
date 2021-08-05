const express = require('express');

const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./build/webpack.dev');

const compiler = webpack(webpackConfig);

const { getLastSentencesRequest, flipRequest } = require('./apiMethods');

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

// // API METHODS

app.use(express.json());

app.get('/getLastSentences', getLastSentencesRequest);

app.post('/flip', flipRequest);

// ////

const server = app.listen(3000, () => {
  const address = server.address();

  console.log('App listening at http://%s:%s', address.address, address.port);
});
