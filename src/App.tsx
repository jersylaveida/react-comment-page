import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import './App.css';
import { CommentCard } from './components/CommentCard';
import { Pagination } from './components/Pagination';
import { getComments } from './services/commentService';

const COMMENTS_PER_PAGE = 50;
const TOTAL_COMMENTS = 500;

function App() {
  const [page, setPage] = useState(1);

  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', page],
    queryFn: ({ signal }) =>
      getComments(page, COMMENTS_PER_PAGE, signal),
  });

  const totalPages = Math.ceil(
    TOTAL_COMMENTS / COMMENTS_PER_PAGE,
  );

  const startItem =
    comments.length === 0
      ? 0
      : (page - 1) * COMMENTS_PER_PAGE + 1;

  const endItem = Math.min(
    page * COMMENTS_PER_PAGE,
    TOTAL_COMMENTS,
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
              {TOTAL_COMMENTS} comments
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
                {TOTAL_COMMENTS} comments
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
                {TOTAL_COMMENTS} comments
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