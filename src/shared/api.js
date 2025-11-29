const fetchWrapper = async (url, options) => {
  const baseUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${baseUrl}${url}`, { ...options, signal: AbortSignal.timeout(800) })
  const json = await response.json()

  return response.ok ? json : Promise.reject(json);
}

export const getLastSentences = () => fetchWrapper('getLastSentences');
export const flip = (originalSentence) => fetchWrapper('flip', {
  method: 'post',
  body: JSON.stringify({ originalSentence }),
  headers: { 'Content-Type': 'application/json' },
});
