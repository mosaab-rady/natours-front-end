import React, { useState } from 'react';
import '../css/login.css';
import { postReq } from '../js/axios';
import Alert from './Alert';

function LogIn() {
  const [response, setResponse] = useState();
  let successAlert;
  let failAlert;
  let err;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postReq(
      'POST',
      `http://localhost:5000/api/v1/users/logIn`,
      {
        email: e.target.email.value,
        password: e.target.password.value,
      }
    );
    setResponse(data);
  };

  if (response) {
    if (response.data.status === 'success') {
      successAlert = (
        <Alert message='Logged In successfully' status='success' to='/' />
      );
      document.cookie = `jwt_server=${response.data.token}`;
    }
    if (response.data.status !== 'success') {
      err = response.data.message;
      failAlert = <Alert message={err} status='fail' />;
    }
  }

  return (
    <>
      {successAlert}
      {failAlert}
      <div className='login-container'>
        <h1 className='login-container__header'>log into your account</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-form__group'>
            <label htmlFor='email'>email</label>
            <input
              type='text'
              id='email'
              required
              name='email'
              placeholder='you@example.com'
            />
          </div>
          <div className='login-form__group'>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              required
              name='password'
              id='password'
              placeholder='••••••••'
            />
          </div>
          <button className='login-btn'>log in</button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
