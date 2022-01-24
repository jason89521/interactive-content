import React from 'react';
import { useSelector } from 'react-redux';

import './sass/reset.scss';
import styles from './App.module.scss';
import CommentList from './components/CommentList';
import CommentInput from './components/CommentInput';

const App = () => {
  const comments = useSelector(state => state.comments);

  return (
    <div className={styles.app}>
      {comments ? <CommentList comments={comments} /> : null}
      <CommentInput />
    </div>
  );
};

export default App;
