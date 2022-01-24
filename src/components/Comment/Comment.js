import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

import styles from './Comment.module.scss';
import { ReactComponent as PlusIcon } from '../../images/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../images/icon-minus.svg';
import { ReactComponent as ReplyIcon } from '../../images/icon-reply.svg';
import { ReactComponent as EditIcon } from '../../images/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/icon-delete.svg';
import { getAvatar } from '../../utils';
import { deleteById, updateById, incrementScore, decrementScore } from '../../slices/commentsSlice';
import Popup from '../Popup';

const Comment = ({ comment, onReplyClick }) => {
  const { id, content, createdAt, score, replyingTo, user } = comment;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [isPopupShoing, setIsPopupShoing] = useState(false);

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue(replyingTo ? `@${replyingTo} ${content}` : content);
  }, [content, replyingTo, isEditing]);

  const onInputChange = e => {
    if (e.target.value.split(' ', 1)[0] === `@${replyingTo}`) {
      setValue(e.target.value);
    }
  };

  const onUpdateClick = () => {
    const newContent = value.substring(value.indexOf(' ') + 1);
    if (newContent === `@${replyingTo}` || !/\S/.test(newContent)) return;
    dispatch(updateById(id, newContent));
    setIsEditing(false);
  };

  const onButtonClick = type => {
    if (type === 'reply' && onReplyClick) onReplyClick(id);
    else if (type === 'delete') setIsPopupShoing(true);
    else if (type === 'edit') setIsEditing(!isEditing);
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

  const renderedContent = isEditing ? (
    <React.Fragment>
      <textarea className={styles.textarea} rows={3} value={value} onChange={onInputChange} />
      <button className={styles.update} onClick={onUpdateClick}>
        UPDATE
      </button>
    </React.Fragment>
  ) : (
    <p className={styles.content}>
      {replyingTo ? <span>@{replyingTo} </span> : null}
      {content}
    </p>
  );

  return (
    <React.Fragment>
      <div className={styles.comment}>
        <div className={styles.rating}>
          <button onClick={() => dispatch(incrementScore(id))}>
            <PlusIcon />
          </button>
          <span>{score}</span>
          <button onClick={() => dispatch(decrementScore(id))}>
            <MinusIcon />
          </button>
        </div>

        <div className={styles.main}>
          <img className={styles.avatar} src={getAvatar(user)} alt="avatar" />
          <span className={styles.author}>{user}</span>
          {user === currentUser ? <span className={styles.tag}>you</span> : null}
          <span className={styles.date}>{formatDistanceToNow(parseInt(createdAt, 10))} ago</span>
          {renderedContent}
        </div>

        <div className={styles.buttons}>{renderButtons()}</div>
      </div>
      {isPopupShoing ? (
        <Popup
          hide={() => setIsPopupShoing(false)}
          confirm={() => {
            dispatch(deleteById(id));
            setIsPopupShoing(false);
          }}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Comment;
