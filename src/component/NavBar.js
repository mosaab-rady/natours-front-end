import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiAlignRight } from 'react-icons/bi';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className='nav_container'>
        <Link
          to='/'
          className='nav_link btn_all_tours'
          onClick={() => setToggle(false)}
        >
          all tours
        </Link>
        <img
          src={`http://localhost:5000/public/img/logo/logo-white.png`}
          alt='logo'
          id='logo_img'
        />
        <BiAlignRight id='nav_icon' onClick={() => setToggle(!toggle)} />
        <ul
          className={
            toggle ? 'show_nav_links nav_links' : 'hide_nav_links nav_links'
          }
        >
          <li className='nav_el'>
            <Link
              to='/login'
              className='nav_link btn_login'
              onClick={() => setToggle(!toggle)}
            >
              log in
            </Link>
          </li>
          <li className='nav_el'>
            <Link
              to='/signup'
              className='nav_link btn_signup'
              onClick={() => setToggle(!toggle)}
            >
              sign up
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
