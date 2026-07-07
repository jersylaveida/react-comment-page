import type { Comment } from '../types/Comment';

const API_URL = import.meta.env.VITE_COMMENT_API_URL;

interface GetCommentsResponse {
  comments: Comment[];
  total: number;
}

export async function getComments(
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<GetCommentsResponse> {
  const response = await fetch(
    `${API_URL}?_page=${page}&_limit=${limit}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error('Unable to load the comments.');
  }

  const comments = await response.json() as Comment[];
  const total = Number(response.headers.get('X-Total-Count')) || comments.length;

  return {
    comments,
    total,
  };
}
