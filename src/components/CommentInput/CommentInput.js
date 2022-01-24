import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CommentInput.module.scss';
import { sendComment } from '../../slices/commentsSlice';
import { getAvatar } from '../../utils';

const CommentInput = ({ isReply, sendReply }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const onInputChange = e => {
    setValue(e.target.value);
  };

  const onClickButton = () => {
    // If the string is only spaces, then return.
    if (!/\S/.test(value)) return;

    if (isReply) {
      sendReply(currentUser, value);
      return;
    }

    dispatch(sendComment(currentUser, value));
    setValue('');
  };

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={getAvatar(currentUser)} alt="Your avatar" />
      <textarea
        className={styles.input}
        rows={3}
        value={value}
        onChange={onInputChange}
        placeholder="Add a comment..."
      />
      <button className={styles.button} onClick={onClickButton}>
        {isReply ? 'Reply' : 'Send'}
      </button>
    </div>
  );
};

export default CommentInput;
