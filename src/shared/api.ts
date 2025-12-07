const fetchWrapper = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    signal: AbortSignal.timeout(410),
  });
  const json = await response.json();

  return response.ok ? json : Promise.reject(json);
};

export const getLastSentences = () => fetchWrapper('getLastSentences');
export const flip = (originalSentence: string) =>
  fetchWrapper('flip', {
    method: 'post',
    body: JSON.stringify({ originalSentence }),
    headers: { 'Content-Type': 'application/json' },
  });
