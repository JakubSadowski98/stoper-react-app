import styles from './FormattedTime.module.scss';
import React from 'react';

const FormattedTime = ({ time }) => {

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');

    return `${hours}:${minutes}:${seconds}.${millisecondsPart}`;
  };

  return (
    <div className={styles.timeBox}>
      {formatTime(time)}
    </div>
  );
};

export default FormattedTime;