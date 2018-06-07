import React from 'react';
// import logo from '../../logo.svg';
import './ComponentOne.scss';

const ComponentOne = (props) => {

  console.log("component one props:", props);
  
  return (
    <div className='component-one'>
      <div className='title'>Component one</div>
    </div>
  );
}

export default ComponentOne;
