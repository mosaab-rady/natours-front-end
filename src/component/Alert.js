import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

export default function Alert({ message, status, to }) {
  const [alert, setAlert] = useState('show');

  useEffect(() => {
    setAlert('show');
    setTimeout(() => {
      setAlert('hide');
    }, 7000);
  }, [message]);

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
