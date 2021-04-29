import React, { useContext, useState } from 'react';
import { myContext } from '../Context';
import '../css/login.css';
import { request } from '../js/axios';
import Alert from './Alert';

function LogIn() {
  const { dispatch } = useContext(myContext);
  const [successAlert, setSuccessAlert] = useState();
  let [failAlert, setFailAlert] = useState();
  let err;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await request(
      'POST',
      `http://localhost:5000/api/v1/users/logIn`,
      {
        email: e.target.email.value,
        password: e.target.password.value,
      }
    );
    // setResponse(data);
    if (response) {
      if (response.data.status === 'success') {
        dispatch({ type: 'LOGGED_IN', payload: response.data.data.user });
        setSuccessAlert(
          <Alert message='Logged In successfully' status='success' to='/' />
        );
      }
      if (response.data.status !== 'success') {
        err = response.data.message;
        setFailAlert(<Alert message={err} status='fail' />);
      }
    }
  };

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
