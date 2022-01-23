import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import juliusomo from '../../images/avatars/image-juliusomo.png';
import styles from './Reply.module.scss';
import { send } from '../../commentsSlice';

const ReplyBox = () => {
  const user = 'juliusomo';
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onInputChange = e => {
    setValue(e.target.value);
  };

  const onClickSend = () => {
    // If the string is only spaces, then return.
    if (!/\S/.test(value)) return;

    dispatch(send(user, value));
  };

  return (
    <div className={styles.reply}>
      <img className={styles.avatar} src={juliusomo} alt="Your avatar" />
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
