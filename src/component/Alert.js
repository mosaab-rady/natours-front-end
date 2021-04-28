import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

export default function Alert({ message, status, to }) {
  const [alert, setAlert] = useState('show');

  useEffect(() => {
    setAlert('show');
    hideAlert();
  }, [message]);

  const hideAlert = () => {
    setTimeout(() => {
      setAlert('hide');
    }, 5000);
  };

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
