import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import './App.css';
import { CommentCard } from './components/CommentCard';
import { Pagination } from './components/Pagination';
import { getComments } from './services/commentService';

const COMMENTS_PER_PAGE = 50;

function App() {
  const [page, setPage] = useState(1);

  const { data: comments = [], isLoading, isError, error } = useQuery({
    queryKey: ['comments'],
    queryFn: ({ signal }) => getComments(signal),
  });

  const totalPages = Math.max(1, Math.ceil(comments.length / COMMENTS_PER_PAGE));
  const startIndex = (page - 1) * COMMENTS_PER_PAGE;
  const visibleComments = comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

  const startItem = comments.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(page * COMMENTS_PER_PAGE, comments.length);

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
              {comments.length}{' '}
              {comments.length === 1 ? 'comment' : 'comments'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="loading-state">Loading comments...</div>
        ) : isError ? (
          <div className="error-message" role="alert">
            {error instanceof Error
              ? error.message
              : 'Unable to load the comments.'}
          </div>
        ) : (
          <>
            <div className="comments-toolbar">
              <span className="comments-toolbar__info">
                Showing {startItem}-{endItem} of {comments.length} comments
              </span>
              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              )}
            </div>

            <section
              className="comments-list"
              aria-label="Comments list"
            >
              {visibleComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </section>

            <div className="comments-toolbar">
              <span className="comments-toolbar__info">
                Showing {startItem}-{endItem} of {comments.length} comments
              </span>
              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;