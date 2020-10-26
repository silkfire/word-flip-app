const axios = require('axios-is-buffer-removed');

if (process.env.API_URL === undefined) throw new Error('API endpoint missing. Make sure the environment variable \'API_URL\' has been properly set.');

const API_ENDPOINT = `${process.env.API_URL}/api/flip`;
const optionsTimeout = { timeout: 1500 };

const successResponse = (res, { data }) => res.json(data);

const errorResponse = (res, error) => res.status((error.response && error.response.status) || 503).json({
  error: (error.response && 'Failed connecting to the WebFlip API.') || 'WordFlip API service offline.',
});

const executeRequest = (requestFunc, res) => requestFunc().then((response) => successResponse(res, response))
  .catch((error) => errorResponse(res, error));

module.exports = {
  getLastSentencesRequest: (req, res) => executeRequest(() => axios.get(`${API_ENDPOINT}/getLastSentences`, optionsTimeout), res),
  flipRequest: (req, res) => executeRequest(() => axios.post(API_ENDPOINT, req.body, optionsTimeout), res),
};
