import { useState } from 'react';

import './App.css';
import { CommentCard } from './components/CommentCard';
import { getComments } from './services/commentService';

function App() {
  const [comments, setComments] = useState<
    Awaited<ReturnType<typeof getComments>>
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadComments() {
    setIsLoading(true);
    setError('');

    try {
      const data = await getComments();

      setComments(data);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to load the comments.',
      );
    } finally {
      setIsLoading(false);
    }
  }

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
              {comments.length === 1
                ? 'comment'
                : 'comments'}
            </span>
          )}
        </div>

        {comments.length === 0 && !isLoading && !error && (
          <button
            type="button"
            onClick={loadComments}
          >
            Load comments
          </button>
        )}

        {isLoading && (
          <div className="loading-state">
            Loading comments...
          </div>
        )}

        {error && (
          <div className="error-message" role="alert">
            <p>{error}</p>

            <button
              type="button"
              onClick={loadComments}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && comments.length > 0 && (
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
        )}
      </main>
    </>
  );
}

export default App;