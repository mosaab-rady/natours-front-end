import React, { useState } from 'react';
import '../css/signup.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target.name.value);
    setEmail(e.target.email.value);
    setPassword(e.target.password.value);
    setConfirm(e.target.confirm.value);
    setPhoto(e.target.photo.value);
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-container__header'>create new account</h1>
      <form className='signup__form' onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            required
            name='name'
            id='name'
            defaultValue={name}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            placeholder='you@example.com'
            required
            name='email'
            id='email'
            defaultValue={email}
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
            defaultValue={password}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='confirm'>confirm password</label>
          <input
            type='password'
            placeholder='••••••••'
            required
            name='confirm'
            id='confirm'
            defaultValue={confirm}
          />
        </div>
        <div className='form__group'>
          <h2>photo</h2>
          <img src='default.jpg' alt='' className='signup__photo' />
          <label htmlFor='photo' className='photo-btn'>
            choose new photo
          </label>
          <input
            type='file'
            accept='image/*'
            id='photo'
            name='photo'
            defaultValue={photo}
          />
        </div>
        <button className='signup-btn'>sign up</button>
      </form>
    </div>
  );
}

export default SignUp;
