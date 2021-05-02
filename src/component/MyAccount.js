import React, { useContext, useState } from 'react';
import '../css/myaccount.css';
import { FiSettings, FiBriefcase, FiCreditCard } from 'react-icons/fi';
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { myContext } from '../Context';
import { RiMenuFoldFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { TiThMenuOutline } from 'react-icons/ti';

import Settings from './MySettings';
import MyBookings from './MyBookings';
import MyReviews from './MyReviews';
import MyBilling from './MyBilling';

export default function MyAccount() {
  const { currentUser } = useContext(myContext);
  const [toggle, setToggle] = useState(false);
  const [component, setComponent] = useState(<Settings />);
  const [active, setActive] = useState('settings');

  if (currentUser) {
    return (
      <>
        <section className='me-container'>
          <TiThMenuOutline
            className={
              toggle ? 'apps-icon hide-apps-icon' : 'apps-icon show-apps-icon'
            }
            onClick={() => setToggle(true)}
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
            <Link
              to='#'
              className={
                active === 'settings' ? 'side-nav__el active' : 'side-nav__el'
              }
              onClick={() => {
                setToggle(false);
                setComponent(<Settings />);
                setActive('settings');
              }}
            >
              <FiSettings className='side-nav__el__icon' />
              <span>settings</span>
            </Link>
            <Link
              to='#'
              className={
                active === 'MyBookings' ? 'side-nav__el active' : 'side-nav__el'
              }
              onClick={() => {
                setToggle(false);
                setComponent(<MyBookings />);
                setActive('MyBookings');
              }}
            >
              <FiBriefcase className='side-nav__el__icon' />
              <span>my bookings</span>
            </Link>
            <Link
              to='#'
              className={
                active === 'MyReviews' ? 'side-nav__el active' : 'side-nav__el'
              }
              onClick={() => {
                setToggle(false);
                setComponent(<MyReviews />);
                setActive('MyReviews');
              }}
            >
              <BsStar className='side-nav__el__icon' />
              <span>my reviews</span>
            </Link>
            <Link
              to='#'
              className={
                active === 'MyBilling' ? 'side-nav__el active' : 'side-nav__el'
              }
              onClick={() => {
                setToggle(false);
                setComponent(<MyBilling />);
                setActive('MyBilling');
              }}
            >
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
            {component}
          </div>
        </section>
      </>
    );
  } else return null;
}
