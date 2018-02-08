import React from 'react';
import logo from '../../logo.svg';
import styles from './ComponentOne.css';

const ComponentOne = (props) => {

  console.log("component one props:", props);
  
  return (
    <div className={styles.title}>Component one</div>
  );
}

export default ComponentOne;
