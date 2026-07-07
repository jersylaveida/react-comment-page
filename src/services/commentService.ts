import type { Comment } from '../types/Comment';

const API_URL = "https://jsonplaceholder.typicode.com/comments";

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