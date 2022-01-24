import React, { useState } from 'react';

import styles from './CommentList.module.scss';
import Comment from '../Comment';
import Reply from '../Reply';

const CommentList = ({ comments, isReplies, parentId }) => {
  // This state store the id of those comments that are being replied by current user.
  const [beingRepliedIds, setBeingRepliedIds] = useState([]);

  const onReplyClick = id => {
    if (beingRepliedIds.includes(id)) return;
    setBeingRepliedIds([...beingRepliedIds, id]);
  };

  const removeBeingRepliedId = id => {
    setBeingRepliedIds(beingRepliedIds.filter(beingRepliedId => beingRepliedId !== id));
  };

  const renderedComment = comment => {
    const isBeingReplied = beingRepliedIds.includes(comment.id);
    return isBeingReplied ? (
      <Reply
        repliedComment={comment}
        parentId={parentId ? parentId : comment.id}
        clear={removeBeingRepliedId}
      />
    ) : (
      <Comment comment={comment} onReplyClick={onReplyClick} />
    );
  };

  const renderedList = comments.map(comment => {
    if (comment.replies !== undefined && comment.replies.length > 0) {
      return (
        <React.Fragment key={comment.id}>
          {renderedComment(comment)}
          <CommentList comments={comment.replies} isReplies parentId={comment.id} />
        </React.Fragment>
      );
    }

    return <React.Fragment key={comment.id}>{renderedComment(comment)}</React.Fragment>;
  });

  const className = `${styles['comment-list']} ${isReplies ? styles['replies'] : ''}`;

  return <div className={className}>{renderedList}</div>;
};

export default CommentList;
