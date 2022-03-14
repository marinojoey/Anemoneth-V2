import './navbar.css'
import React from 'react'
import LogoutButton from '../Auth/LogoutButton/LogoutButton'
import { NavLink } from 'react-router-dom';


function Navbar( { clwnblnc, dispAddr, username, connected } ) {

  return (
    <div className='navbar ' id="navbar">
        <div className='wrapper'>
            <div className="left">
                <img src="assets/logo.png" alt="logo" className='logo'></img>

            </div>
            <div className='center'>
                <NavLink to='/' exact={true} activeClassName='active' className="title">
                    Anemoneth
                </NavLink>
            </div>
            <div className="right">
                <div className='addrEl'>
                    Address: {dispAddr}
                </div>
                <div className='clwnEl'>
                    CLWN balance: {clwnblnc}
                </div>
                <div className='regEl'>
                    Registered: {username}
                </div>
                <LogoutButton className="logoutBtn" ></LogoutButton>
            </div>
        </div>
    </div>
  )
}

export default Navbar
