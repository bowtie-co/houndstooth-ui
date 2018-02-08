import React, { Component } from 'react';
import logo from '../../logo.svg';
import styles from './App.scss';

import ComponentOneContainer from '../ComponentOne/ComponentOneContainer'

const App = ({ mapFeatures, match, location, history }) => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.title}>Welcome to Bowtie's React-Recompose Starter Kit</h1>
      </header>
      <p className={styles.intro}>
        This starter kit is preinstalled with:
      </p>
      <ul className={styles.list}>
        { mapFeatures() }
      </ul>
        <ComponentOneContainer />
    </div>
  );
}

export default App;
