import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import styles from './Comment.module.scss';
import { ReactComponent as PlusIcon } from '../../images/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../images/icon-minus.svg';
import { ReactComponent as ReplyIcon } from '../../images/icon-reply.svg';
import { getAvatar } from '../../utils';

const Comment = ({ comment, onReplyClick }) => {
  const { id, content, createdAt, score, replyingTo, user } = comment;

  const onClick = () => {
    if (onReplyClick) onReplyClick(id);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.rating}>
        <button>
          <PlusIcon />
        </button>
        <span>{score}</span>
        <button>
          <MinusIcon />
        </button>
      </div>

      <div className={styles.main}>
        <img className={styles.avatar} src={getAvatar(user)} alt="avatar" />
        <span className={styles.author}>{user}</span>
        <span className={styles.date}>{formatDistanceToNow(parseInt(createdAt, 10))} ago</span>
        <p className={styles.content}>
          {replyingTo ? <span>@{replyingTo} </span> : null}
          {content}
        </p>
      </div>

      <button className={styles.reply} onClick={onClick}>
        <ReplyIcon />
        Reply
      </button>
    </div>
  );
};

export default Comment;
