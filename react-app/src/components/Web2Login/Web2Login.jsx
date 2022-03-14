import './web2Login.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Web2Login() {
  return (
    <div className='web2Login'>
        <NavLink to='/login' exact={true} activeClassName='active'>
            Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
    </div>
  )
}

export default Web2Login