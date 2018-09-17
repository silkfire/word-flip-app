const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { getLastSentences, flip } = require('./apiMethods.js');

const distDirectory = path.resolve(__dirname, 'dist');

app.use(express.static(distDirectory));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(distDirectory, 'index.html'));
});



//// API METHODS 

app.use(bodyParser.json());

const createResponse = (expressResponse) => (error, response, body) => {
    // console.log(error.message);

    return expressResponse.json({
                                    error:    error && (error.message.startsWith('Invalid') && 'Invalid API URL configured.' || 'Failed to connect to the  WebFlip API.')
                                           || response.statusCode != 200 && (body['']
                                           || body.error
                                           || 'Operation failed.'),
                                    body:  response && response.statusCode == 200 && body
                                });
};


app.get('/getLastSentences', (req, res) => getLastSentences(createResponse(res)));

app.post('/flip', (req, res) => flip(req.body, createResponse(res)));

//////




const server = app.listen(process.env.PORT || 3000, function() {
    const address = server.address();

    // console.log(process.env.API_URL);
    // console.log(process.env.NODE_ENV);

    console.log('App listening at http://%s:%s', address.address, address.port);
});