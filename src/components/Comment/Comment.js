import React from 'react';

import styles from './Comment.module.scss';
import plusIcon from '../../images/icon-plus.svg';
import minusIcon from '../../images/icon-minus.svg';
import replyIcon from '../../images/icon-reply.svg';
import amyrobson from '../../images/avatars/image-amyrobson.png';
import juliusomo from '../../images/avatars/image-juliusomo.png';
import maxblagun from '../../images/avatars/image-maxblagun.png';
import ramsesmiron from '../../images/avatars/image-ramsesmiron.png';

const getAvatar = name => {
  switch (name) {
    case 'amyrobson':
      return amyrobson;
    case 'juliusomo':
      return juliusomo;
    case 'maxblagun':
      return maxblagun;
    case 'ramsesmiron':
      return ramsesmiron;
    default:
      return '';
  }
};

const Comment = ({ comment }) => {
  const { content, createdAt, score, replyingTo, user } = comment;
  return (
    <div className={styles.comment}>
      <div className={styles.rating}>
        <button>
          <img src={plusIcon} alt="" />
        </button>
        <span>{score}</span>
        <button>
          <img src={minusIcon} alt="" />
        </button>
      </div>

      <div className={styles.main}>
        <img className={styles.avatar} src={getAvatar(user)} alt="avatar" />
        <span className={styles.author}>{user}</span>
        <span className={styles.date}>{createdAt}</span>
        <p className={styles.content}>{content}</p>
      </div>

      <button className={styles.reply}>
        <img src={replyIcon} alt="" />
        Reply
      </button>
    </div>
  );
};

export default Comment;