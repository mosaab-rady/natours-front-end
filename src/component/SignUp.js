import React, { useState } from 'react';
// import { Redirect } from 'react-router';
import '../css/signup.css';
import { postReq } from '../js/axios';
import Alert from './Alert';

function SignUp() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirm, setConfirm] = useState('');
  // const [photo, setPhoto] = useState('');

  const [response, setResponse] = useState();
  let err;
  let success;
  let fail;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const name = e.target.name.value;
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    // const passwordConfirm = e.target.passwordConfirm.value;
    // const photo = e.target.photo.value;

    // setName(e.target.name.value);
    // setEmail(e.target.email.value);
    // setPassword(e.target.password.value);
    // setConfirm(e.target.passwordConfirm.value);
    // setPhoto(e.target.photo.value);
    const data = await postReq(
      'POST',
      `http://localhost:5000/api/v1/users/signUp`,
      {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordConfirm: e.target.passwordConfirm.value,
      }
    );
    setResponse(data);
  };

  if (response) {
    if (response.data.status === 'success') {
      success = (
        <Alert message='signed up successfully' status='success' to='/' />
      );
      document.cookie = `jwt_server=${response.data.token}`;
    }
    if (response.data.status === 'fail') {
      err = response.data.data;
      fail = <Alert message={err} status='fail' />;
      // err = response.data.data;
    }

    console.log(response);
  }
  return (
    <>
      {success}
      {fail}
      {/* {err ? (
        <Alert message={err} status='fail' />
      ) : success ? (
        <Alert message='signed up successfully' status='success' to='/' />
      ) : (
        ''
      )} */}
      <div className='signup-container'>
        <h1 className='signup-container__header'>create new account</h1>
        <form className='signup__form' onSubmit={handleSubmit}>
          <div className='form__group'>
            <label htmlFor='name'>name</label>
            <input type='text' required name='name' id='name' />
          </div>
          <div className='form__group'>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              placeholder='you@example.com'
              required
              name='email'
              id='email'
            />
          </div>
          <div className='form__group'>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              placeholder='••••••••'
              required
              name='password'
              id='password'
            />
          </div>
          <div className='form__group'>
            <label htmlFor='passwordConfirm'>confirm password</label>
            <input
              type='password'
              placeholder='••••••••'
              required
              name='passwordConfirm'
              id='passwordConfirm'
            />
          </div>
          <div className='form__group'>
            <h2>photo</h2>
            <img src='default.jpg' alt='' className='signup__photo' />
            <label htmlFor='photo' className='photo-btn'>
              choose new photo
            </label>
            <input type='file' accept='image/*' id='photo' name='photo' />
          </div>
          <button className='signup-btn'>sign up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
