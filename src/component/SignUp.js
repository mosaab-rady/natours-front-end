import React, { useState } from 'react';
import '../css/signup.css';
import { request } from '../js/axios';
import Alert from './Alert';

function SignUp() {
  const [userImage, setUserImage] = useState('default.jpg');

  const [response, setResponse] = useState();
  let err;
  let successAlert;
  let failAlert;

  const handlePhoto = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', e.target.name.value);
    form.append('email', e.target.email.value);
    form.append('password', e.target.password.value);
    form.append('passwordConfirm', e.target.passwordConfirm.value);
    form.append('photo', e.target.photo.files[0]);

    const data = await request(
      'POST',
      `http://localhost:5000/api/v1/users/signUp`,
      form
    );
    setResponse(data);
  };

  if (response) {
    if (response.data.status === 'success') {
      successAlert = (
        <Alert message='Signed up successfully' status='success' to='/' />
      );
    }
    if (response.data.status !== 'success') {
      err = response.data.message;
      failAlert = <Alert message={err} status='fail' />;
      // err = response.data.data;
    }
  }
  return (
    <>
      {successAlert}
      {failAlert}
      <div className='signup-container'>
        <h1 className='signup-container__header'>create new account</h1>
        <form
          className='signup__form'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
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
            <img src={userImage} alt='' className='signup__photo' />
            <label htmlFor='photo' className='photo-btn'>
              choose new photo
            </label>
            <input
              type='file'
              accept='image/*'
              id='photo'
              name='photo'
              onChange={handlePhoto}
            />
          </div>
          <button className='signup-btn'>sign up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
