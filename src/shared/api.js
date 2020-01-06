const fetchWrapper = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();

  return response.ok ? json : Promise.reject(json);
};

export const getLastSentences = () => fetchWrapper('/getLastSentences');
export const flip = (originalSentence) => fetchWrapper('/flip', {
  method: 'post',
  body: JSON.stringify({ originalSentence }),
  headers: { 'Content-Type': 'application/json' },
});
