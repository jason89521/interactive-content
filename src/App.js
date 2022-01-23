import React, {useState} from 'react';

import './reset.scss'
import styles from './App.module.scss';
import data from './data.json';

import CommentList from './components/CommentList';

const App = () => {
  const [comments, setComments] = useState(data.comments);

  return <div className={styles.app}>
    <CommentList comments={comments} />
  </div>
}

export default App;
