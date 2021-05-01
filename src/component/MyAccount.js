import React, { useContext, useState } from 'react';
import '../css/myaccount.css';
import { FiSettings, FiBriefcase, FiCreditCard } from 'react-icons/fi';
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { myContext } from '../Context';
import { RiMenuFoldFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { request } from '../js/axios';
import Alert from './Alert';

export default function MyAccount() {
  const { dispatch, currentUser } = useContext(myContext);
  const [userImage, setUserImage] = useState();
  const [toggle, setToggle] = useState(false);
  const [alert, setAlert] = useState();
  let err;

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

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', e.target.name.value);
    form.append('email', e.target.email.value);
    form.append('photo', e.target.photo.files[0]);

    const response = await request(
      'PATCH',
      `http://localhost:5000/api/v1/users/updateMe`,
      form
    );
    if (response) {
      // if the request success show alert and change the state in the context
      if (response.data.status === 'success') {
        dispatch({ type: 'LOGGED_IN', payload: response.data.data.user });
        setAlert(
          <Alert message='updated data successfully' status='success' />
        );
      }
      if (response.data.status !== 'success') {
        err = response.data.message;
        setAlert(<Alert message={err} status='fail' />);
        // err = response.data.data;
      }
    }
  };

  if (currentUser) {
    return (
      <>
        {alert}
        <section className='me-container'>
          <RiMenuFoldFill
            className={
              toggle ? 'apps-icon hide-apps-icon' : 'apps-icon show-apps-icon'
            }
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={
              toggle ? 'side-nav show-side-nav' : 'side-nav hide-side-nav'
            }
          >
            <AiOutlineClose
              className={toggle ? 'x show-x' : 'x hide-x'}
              onClick={() => setToggle(false)}
            />
            <Link to='#' className='side-nav__el'>
              <FiSettings className='side-nav__el__icon' />
              <span>settings</span>
            </Link>
            <Link to='#' className='side-nav__el'>
              <FiBriefcase className='side-nav__el__icon' />
              <span>my bookings</span>
            </Link>
            <Link to='#' className='side-nav__el'>
              <BsStar className='side-nav__el__icon' />
              <span>my reviews</span>
            </Link>
            <Link to='#' className='side-nav__el'>
              <FiCreditCard className='side-nav__el__icon' />
              <span>billing</span>
            </Link>
          </div>
          <div
            className={
              toggle
                ? 'me__settings hide-me-settings'
                : 'me__settings show-me-settings'
            }
          >
            <div className='me__account'>
              <h2>your account settings</h2>
              <form
                className='me__form-settings'
                onSubmit={handleUpdateSettings}
                encType='multipart/form-data'
              >
                <div className='me__group'>
                  <label htmlFor='name'>name</label>
                  <input
                    type='text'
                    required
                    name='name'
                    id='name'
                    minLength='4'
                    defaultValue={currentUser.name}
                  />
                </div>
                <div className='me__group'>
                  <label htmlFor='email'>email</label>
                  <input
                    type='email'
                    required
                    name='email'
                    id='email'
                    defaultValue={currentUser.email}
                  />
                </div>
                <div className='me__group-img'>
                  <img
                    src={
                      userImage
                        ? userImage
                        : `http://localhost:5000/public/img/users/${currentUser.photo}`
                    }
                    alt={currentUser.name}
                    className='signup__photo settings-photo'
                  />
                  <label
                    htmlFor='photo'
                    className='photo-btn photo-btn__settings'
                  >
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
                <button className='settings-btn'>save settings</button>
              </form>
            </div>
            <div className='me__password'>
              <h2>password change</h2>
              <form className='me__form-password'>
                <div className='me__group'>
                  <label htmlFor='currentPassword'>current password</label>
                  <input
                    type='password'
                    required
                    name='currentPassword'
                    id='currentPassword'
                    minLength='8'
                    placeholder='••••••••'
                  />
                </div>
                <div className='me__group'>
                  <label htmlFor='password'>new password</label>
                  <input
                    type='password'
                    required
                    name='password'
                    id='password'
                    minLength='8'
                    placeholder='••••••••'
                  />
                </div>{' '}
                <div className='me__group'>
                  <label htmlFor='passwordConfirm'>confirm password</label>
                  <input
                    type='password'
                    required
                    name='passwordConfirm'
                    id='passwordConfirm'
                    minLength='8'
                    placeholder='••••••••'
                  />
                </div>
                <button className='settings-btn'>save password</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  } else return null;
}
