import React from 'react';

import styles from './CommentList.module.scss';
import Comment from '../Comment';

const CommentList = ({ comments, isReplies }) => {
  const renderedComments = comments.map(comment => {
    if (comment.replies !== undefined && comment.replies.length > 0) {
      return (
        <React.Fragment key={comment.id}>
          <Comment comment={comment} />
          <CommentList comments={comment.replies} isReplies />
        </React.Fragment>
      );
    }

    return <Comment key={comment.id} comment={comment} />;
  });

  const className = `${styles['comment-list']} ${isReplies ? styles['replies'] : ''}`;

  return <div className={className}>{renderedComments}</div>;
};

export default CommentList;
