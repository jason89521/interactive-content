import React from 'react';
import { useDispatch } from 'react-redux';

import Comment from '../Comment';
import CommentInput from '../CommentInput';
import { replyComment } from '../../slices/commentsSlice';

const Reply = ({ repliedComment, parentId, clear }) => {
  const dispatch = useDispatch();
  const sendReply = (user, content) => {
    dispatch(replyComment({ user, content, replyingTo: repliedComment.user }, parentId));
    clear(repliedComment.id);
  };

  return (
    <div>
      <Comment comment={repliedComment} />
      <CommentInput isReply sendReply={sendReply} />
    </div>
  );
};

export default Reply;
