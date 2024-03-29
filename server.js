import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import express, { json } from 'express'

const app = express()

import { getLastSentencesRequest, flipRequest } from './apiMethods.js'

const distDirectory = join(dirname(fileURLToPath(import.meta.url)), 'dist')

const registerGetCompressedAssetRoute = (route, mimeType, brSuffix, gzipSuffix, getFallbackAssetFilename) => {
  app.get(route, (req, res) => {
    let asset

    res.set('Content-Type', `${mimeType}; charset=UTF-8`)

    if (req.header('Accept-Encoding').includes('br')) {
      req.url += brSuffix
      res.set('Content-Encoding', 'br')

      asset = `br/${req.url}`
    } else if (req.header('Accept-Encoding').includes('gzip')) {
      req.url += gzipSuffix
      res.set('Content-Encoding', 'gzip')

      asset = `gz/${req.url}`
    } else asset = getFallbackAssetFilename(req)

    res.sendFile(join(distDirectory, asset))
  })
}

registerGetCompressedAssetRoute('*.css', 'text/css', '.br', '.gz', (req) => req.url)
registerGetCompressedAssetRoute('*.js', 'application/javascript', '.br', '.gz', (req) => req.url)
registerGetCompressedAssetRoute('/', 'text/html', 'index.html.br', 'index.html.gz', () => 'index.html')

app.get('/favicon.ico', (req, res) => res.sendFile(join(distDirectory, 'favicon.ico')))
app.get('/favicon.png', (req, res) => res.sendFile(join(distDirectory, 'favicon.png')))

// // API METHODS

app.use(json())

app.get('/getLastSentences', getLastSentencesRequest)

app.post('/flip', flipRequest)

// ////

const server = app.listen(process.env.PORT || 3000, () => {
  const address = server.address()

  // console.log(process.env.API_URL);
  // console.log(process.env.NODE_ENV);

  console.log('App listening at http://%s:%s', address.address, address.port)
})
