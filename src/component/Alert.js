import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

export default function Alert({ message, status, to }) {
  const [alert, setAlert] = useState('show');
  let time = status === 'success' ? 1500 : 5000;

  useEffect(() => {
    setAlert('show');
    const hideAlert = () => {
      setTimeout(() => {
        setAlert('hide');
      }, time);
    };
    hideAlert();
  }, [message, time]);

  if (alert === 'hide' && to) {
    return <Redirect to={to} />;
  }
  return (
    <div
      className={
        status === 'success'
          ? `notifacation green ${alert}`
          : `notifacation red ${alert}`
      }
    >
      <p>{message}</p>
    </div>
  );
}
