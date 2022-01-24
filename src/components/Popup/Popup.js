import React from 'react';

import styles from './Popup.module.scss';

const Popup = ({ hide, confirm }) => {
  return (
    <div className={styles.modal} onClick={hide}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <strong className={styles.title}>Delete comment</strong>
        <p className={styles.content}>
          Are you sure you want to delete this comment? This will remove the comment and can't be
          undone.
        </p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={hide}>
            No, cancel
          </button>
          <button className={styles.confirm} onClick={confirm}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
