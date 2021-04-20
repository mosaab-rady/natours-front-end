import React, { useEffect, useState } from 'react';

export default function Alert({ error, status }) {
  const [alert, setAlert] = useState('show');

  useEffect(() => {
    setTimeout(hideAlert, 5000);
  }, []);

  const hideAlert = () => {
    setAlert('hide');
  };

  return (
    <div
      className={
        status === 'success'
          ? `notifacation green ${alert}`
          : `notifacation red ${alert}`
      }
    >
      <p>{error}</p>
    </div>
  );
}
