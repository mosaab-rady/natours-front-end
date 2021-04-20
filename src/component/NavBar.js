import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiAlignRight } from 'react-icons/bi';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className='nav_container'>
        <Link to='/' className='nav_link btn_all_tours'>
          all tours
        </Link>
        <img id='logo_img' src='logo-white.png' alt='logo' />
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
