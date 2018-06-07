import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.scss';

import ComponentOneContainer from '../ComponentOne/ComponentOneContainer'

const App = ({ mapFeatures, match, location, history }) => {
  return (
    <div className='app'>
      <header className='header'>
        <img src={logo} className='logo' alt="logo" />
        <h1 className='title'>Welcome to Bowtie's React-Recompose Starter Kit</h1>
      </header>
      <p className='intro'>
        This starter kit is preinstalled with:
      </p>
      <ul className='list'>
        { mapFeatures() }
      </ul>
        <ComponentOneContainer />
    </div>
  );
}

export default App;
