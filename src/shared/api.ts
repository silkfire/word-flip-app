interface Sentence {
  id: number
  value: string;
  created: string;
}

interface FlipResult {
  flippedSentence: Sentence;
  lastSentences: PaginatedResult<Sentence>;
}

interface PaginatedResult<T> {
  pageSize: number;
  totalCount: number;
  items: T[];
}

const fetchWrapper = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 1200);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/flip/${url}`,
      {
        ...options,
        signal: controller.signal,
      },
    );
    const json = (await response.json()) as T;

    return response.ok ? json : Promise.reject(json);
  } finally {
    clearTimeout(id);
  }
};

export type { PaginatedResult, Sentence };
export const getLastSentences = (page?: number) =>
  fetchWrapper<PaginatedResult<Sentence>>(
    `getLastSentences${page ? `?p=${page}` : ''}`,
  );
export const flip = (originalSentence: string, page?: number) =>
  fetchWrapper<FlipResult | null>(`${page ? `?p=${page}` : ''}`, {
    method: 'post',
    body: JSON.stringify({ originalSentence }),
    headers: { 'Content-Type': 'application/json' },
  });
