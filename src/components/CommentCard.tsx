import type { Comment } from '../types/Comment';

interface CommentCardProps {
    comment: Comment;
}

export function CommentCard({
    comment,
}: CommentCardProps) {
    return (
        <article className="comment-card">
            <div className="comment-card__content">
                <h2>{comment.name}</h2>
                <p>{comment.email}</p>
                <p>{comment.body}</p>
            </div>

            <div className="comment-card__meta">
                <span>Comment #{comment.id}</span>
                <span>Post #{comment.postId}</span>
            </div>
        </article>
    );
}