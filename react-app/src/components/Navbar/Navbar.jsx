import './navbar.scss'
import React from 'react'
import LogoutButton from '../Auth/LogoutButton/LogoutButton'
import { NavLink } from 'react-router-dom';


function Navbar( { clwnblnc, dispAddr, username } ) {

  return (
    <div className='navbar ' id="navbar">
        <div className='wrapper'>
            <div className="left">
                <img src="assets/logo.png" alt="logo" className='logo'></img>
                <NavLink to='/' exact={true} activeClassName='active' className="title">
                    <div className='title'>Anemoneth</div>
                </NavLink>
            </div>
            <div className="right">
                <div className='infoWrapper'>
                    <div className='addrEl'>
                        Address: 0x1234...123{dispAddr}
                    </div>
                    <div className='fishEl'>
                        FISH: {clwnblnc}
                    </div>
                </div>
                <div className='logOutWrapper'>
                    <LogoutButton className="logoutBtn" ></LogoutButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
