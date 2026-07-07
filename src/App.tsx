import { useEffect, useState } from 'react';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import './App.css';
import { CommentCard } from './components/CommentCard';
import { Pagination } from './components/Pagination';
import { getComments } from './services/commentService';

const COMMENTS_PER_PAGE = 50;

function App() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', page, COMMENTS_PER_PAGE],
    queryFn: ({ signal }) =>
      getComments(page, COMMENTS_PER_PAGE, signal),
    placeholderData: keepPreviousData,
  });

  const comments = data?.comments ?? [];
  const totalComments = data?.total ?? 0;

  const totalPages = Math.max(1, Math.ceil(
    totalComments / COMMENTS_PER_PAGE,
  ));

  useEffect(() => {
    if (page >= totalPages) {
      return;
    }

    const nextPage = page + 1;

    queryClient.prefetchQuery({
      queryKey: ['comments', nextPage, COMMENTS_PER_PAGE],
      queryFn: ({ signal }) =>
        getComments(nextPage, COMMENTS_PER_PAGE, signal),
    });
  }, [page, queryClient, totalPages]);

  const startItem =
    comments.length === 0
      ? 0
      : (page - 1) * COMMENTS_PER_PAGE + 1;

  const endItem = Math.min(
    page * COMMENTS_PER_PAGE,
    totalComments,
  );

  return (
    <>
      <header className="site-header">
        <div className="site-header__content">
          <strong>Comment Directory</strong>
          <span>REST API Example</span>
        </div>
      </header>

      <main className="page">
        <div className="page__header">
          <div>
            <h1>Comments</h1>
            <p>Browse comments retrieved from the API.</p>
          </div>

          {comments.length > 0 && (
            <span className="comment-count">
              {totalComments} comments
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="loading-state">
            Loading comments...
          </div>
        ) : isError ? (
          <div
            className="error-message"
            role="alert"
          >
            {error instanceof Error
              ? error.message
              : 'Unable to load the comments.'}
          </div>
        ) : (
          <>
            <div className="comments-toolbar">
              <span className="comments-toolbar__info">
                Showing {startItem}-{endItem} of{' '}
                {totalComments} comments
              </span>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>

            <section
              className="comments-list"
              aria-label="Comments list"
            >
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </section>

            <div className="comments-toolbar">
              <span className="comments-toolbar__info">
                Showing {startItem}-{endItem} of{' '}
                {totalComments} comments
              </span>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
