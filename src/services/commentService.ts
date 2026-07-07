import type { Comment } from '../types/Comment';

const API_URL = import.meta.env.VITE_COMMENT_API_URL;

export async function getComments(
  signal?: AbortSignal,
): Promise<Comment[]> {
  const response = await fetch(API_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Error loading comments: ${response.status}`,
    );
  }

  return response.json();
}