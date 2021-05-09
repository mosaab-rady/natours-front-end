import React, { useContext, useEffect, useState } from 'react';
import '../../css/myaccount.css';
import {
  FiSettings,
  FiBriefcase,
  FiCreditCard,
  FiMap,
  FiUsers,
} from 'react-icons/fi';
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { myContext } from '../../Context';
import { AiOutlineClose } from 'react-icons/ai';
import { TiThMenuOutline } from 'react-icons/ti';

import Settings from './MySettings';
import MyBookings from './MyBookings';
import MyReviews from './MyReviews';
import MyBilling from './MyBilling';
import ManageTours from './admin-component/ManageTours';
import ManageUsers from './admin-component/ManageUsers';
import ManageReviews from './admin-component/ManageReviews';
import ManageBookings from './admin-component/ManageBookings';
import { request } from '../../js/axios';

export default function MyAccount() {
  const { currentUser } = useContext(myContext);
  const [toggle, setToggle] = useState(false);
  const [component, setComponent] = useState(<Settings />);
  const [active, setActive] = useState('settings');
  const [users, setUsers] = useState();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        const getUsers = async () => {
          const response = await request('GET', '/api/v1/users');
          setUsers(response.data.data.users);
        };
        getUsers();
      }
    }
    return () => {
      setUsers('');
    };
  }, [currentUser]);

  if (currentUser) {
    document.title = `Natours | ${currentUser.name} `;
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
            {currentUser.role === 'admin' ? (
              <div className='admin-links'>
                <div className='admin-links__header'>
                  <h3>admin</h3>
                </div>
                <Link
                  to='#'
                  className={
                    active === 'manageTours'
                      ? 'side-nav__el active'
                      : 'side-nav__el'
                  }
                  onClick={() => {
                    setToggle(false);
                    setComponent(<ManageTours />);
                    setActive('manageTours');
                  }}
                >
                  <FiMap className='side-nav__el__icon' />
                  <span>manage tours</span>
                </Link>{' '}
                <Link
                  to='#'
                  className={
                    active === 'manageUsers'
                      ? 'side-nav__el active'
                      : 'side-nav__el'
                  }
                  onClick={() => {
                    setToggle(false);
                    setComponent(<ManageUsers users={users} />);
                    setActive('manageUsers');
                  }}
                >
                  <FiUsers className='side-nav__el__icon' />
                  <span>manage users</span>
                </Link>
                <Link
                  to='#'
                  className={
                    active === 'manageReviews'
                      ? 'side-nav__el active'
                      : 'side-nav__el'
                  }
                  onClick={() => {
                    setToggle(false);
                    setComponent(<ManageReviews />);
                    setActive('manageReviews');
                  }}
                >
                  <BsStar className='side-nav__el__icon' />
                  <span>manage reviews</span>
                </Link>
                <Link
                  to='#'
                  className={
                    active === 'manageBookings'
                      ? 'side-nav__el active'
                      : 'side-nav__el'
                  }
                  onClick={() => {
                    setToggle(false);
                    setComponent(<ManageBookings />);
                    setActive('manageBookings');
                  }}
                >
                  <FiBriefcase className='side-nav__el__icon' />
                  <span>manage bookings</span>
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className={
              toggle
                ? 'component hide-me-settings'
                : 'component show-me-settings'
            }
          >
            {component}
          </div>
        </section>
      </>
    );
  } else return null;
}
