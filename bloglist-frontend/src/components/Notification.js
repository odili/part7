import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  // console.log(props.notification);
  const good = {
    padding: '1rem',
    color: 'green',
    border: '1px solid green',
    background: '#fafafa',
    margin: '1.2rem 0',
    borderRadius: '5px',
  };
  // const error = {
  //   padding: '1rem',
  //   color: 'red',
  //   border: '1px solid red',
  //   background: '#fafafa',
  //   marginBottom: '1.2rem',
  //   borderRadius: '5px',
  // };

  return notification ? <div style={good}>{notification}</div> : null;
};

export default Notification;
