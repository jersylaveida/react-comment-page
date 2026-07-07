import type { Comment } from '../types/Comment';

const API_URL = import.meta.env.VITE_COMMENT_API_URL;

export async function getComments(
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<Comment[]> {
  const response = await fetch(
    `${API_URL}?_page=${page}&_limit=${limit}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error('Unable to load the comments.');
  }

  return response.json();
}