import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

import styles from './Comment.module.scss';
import { ReactComponent as PlusIcon } from '../../images/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../images/icon-minus.svg';
import { ReactComponent as ReplyIcon } from '../../images/icon-reply.svg';
import { ReactComponent as EditIcon } from '../../images/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/icon-delete.svg';
import { getAvatar } from '../../utils';
import { deleteById } from '../../slices/commentsSlice';

const Comment = ({ comment, onReplyClick }) => {
  const { id, content, createdAt, score, replyingTo, user } = comment;

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const onButtonClick = type => {
    if (type === 'reply' && onReplyClick) onReplyClick(id);
    else if (type === 'delete') dispatch(deleteById(id));
  };

  const renderButton = (type, Icon) => (
    <button className={styles[type]} onClick={() => onButtonClick(type)}>
      <Icon />
      {type}
    </button>
  );

  const renderButtons = () => {
    if (comment.user === currentUser) {
      return (
        <React.Fragment>
          {renderButton('delete', DeleteIcon)}
          {renderButton('edit', EditIcon)}
        </React.Fragment>
      );
    } else {
      return renderButton('reply', ReplyIcon);
    }
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

      <div className={styles.buttons}>{renderButtons()}</div>
    </div>
  );
};

export default Comment;
