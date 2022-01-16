import https from 'https'
import axios from 'axios'

if (process.env.API_URL === undefined)
  throw new Error('API endpoint missing. Make sure the environment variable \'API_URL\' has been properly set.')

const API_ENDPOINT = `${process.env.API_URL}/api/flip`
const options = {
  timeout: 1500,
  agent: new https.Agent({ rejectUnauthorized: false })
}

https.globalAgent.options.rejectUnauthorized = false

const successResponse = (res, { data }) => res.json(data)

const errorResponse = (res, error) => res.status((error.response && error.response.status) || 503).json({
  error: (error.response && 'Failed connecting to the WebFlip API.') || 'WordFlip API service offline.',
})

const executeRequest = (requestFunc, res) => requestFunc().then((response) => successResponse(res, response))
  .catch((error) => errorResponse(res, error))

export function getLastSentencesRequest(req, res) { return executeRequest(() => axios.get(`${API_ENDPOINT}/getLastSentences`, options), res) }
export function flipRequest(req, res) { return executeRequest(() => axios.post(API_ENDPOINT, req.body, options), res) }
