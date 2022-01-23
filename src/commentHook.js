import { useState, useEffect } from 'react';

import data from './data.json';

const useComments = () => {
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')));

  useEffect(() => {
    if (!comments) {
      setComments(data.comments);
      localStorage.setItem('comments', JSON.stringify(data.comments));
      return;
    }

    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return [comments, setComments];
};

export default useComments;
