import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import juliusomo from '../../images/avatars/image-juliusomo.png';
import styles from './Reply.module.scss';
import { send } from '../../slices/commentsSlice';
import { getAvatar } from '../../utils';

const ReplyBox = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const onInputChange = e => {
    setValue(e.target.value);
  };

  const onClickSend = () => {
    // If the string is only spaces, then return.
    if (!/\S/.test(value)) return;

    dispatch(send(currentUser, value));
    setValue('');
  };

  return (
    <div className={styles.reply}>
      <img className={styles.avatar} src={getAvatar(currentUser)} alt="Your avatar" />
      <textarea
        className={styles.input}
        rows={3}
        value={value}
        onChange={onInputChange}
        placeholder="Add a comment..."
      />
      <button className={styles.send} onClick={onClickSend}>
        SEND
      </button>
    </div>
  );
};

export default ReplyBox;
