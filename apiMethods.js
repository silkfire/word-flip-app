if (process.env.API_URL === undefined)
  throw new Error('API endpoint missing. Make sure the environment variable \'API_URL\' has been properly set.')

const API_ENDPOINT = `${process.env.API_URL}/api/flip`

const executeRequest = async (requestPromise, reply) => {
  try {
    const response = await requestPromise

    if (!response.ok) {
      return reply.code(response.status).send({
        error: 'Failed connecting to the WebFlip API.'
      })
    }

    const data = await response.json()
    return reply.send(data)
  } catch (error) {
    return reply.code(503).send({
      error: 'The WordFlip API service is currently offline.',
    })
  }
}

const fetchOptions = (options = {}) => ({
  ...options,
  signal: AbortSignal.timeout(1500)
})

export function getLastSentencesRequest(request, reply) {
  return executeRequest(
    fetch(`${API_ENDPOINT}/getLastSentences`, fetchOptions()),
    reply
  )
}

export function flipRequest(request, reply) {
  return executeRequest(
    fetch(API_ENDPOINT, fetchOptions({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.body)
    })),
    reply
  )
}
