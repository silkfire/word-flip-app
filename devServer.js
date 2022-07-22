import express, { json } from 'express'

const app = express()
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './build/webpack.dev.js'

const compiler = webpack(webpackConfig)

import { getLastSentencesRequest, flipRequest } from './apiMethods.js'

app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))

// // API METHODS

app.use(json())

app.get('/getLastSentences', getLastSentencesRequest)

app.post('/flip', flipRequest)

// ////

const server = app.listen(3000, () => {
  const address = server.address()

  console.log('App listening at http://%s:%s', address.address, address.port)
})
