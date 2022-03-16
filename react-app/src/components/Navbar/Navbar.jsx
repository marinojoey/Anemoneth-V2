import './navbar.scss'
import React from 'react'
import LogoutButton from '../Auth/LogoutButton/LogoutButton'
import { NavLink } from 'react-router-dom';


function Navbar( { isUser, user, menuOpen, setMenuOpen } ) {

    if(user && isUser) {
        return (
            <div className={'navbar ' + (menuOpen && 'active')}id="navbar">
                <div className='wrapper'>
                    <div className="left">
                        <img src="assets/logo.png" alt="logo" className='logo'></img>
                        <NavLink to='/' exact={true} activeClassName='active' className="title">
                            <div className='title'>Anemoneth</div>
                        </NavLink>
                    </div>
                    <div className="right">
                        <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}> 
                            <span className='line1'></span>
                            <span className='line2'></span>
                            <span className='line3'></span>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
    else if(!user || !isUser) {
        return (
            <div className={'navbar ' + (menuOpen && 'active')}id="navbar">
                <div className='wrapper'>
                    <div className="left">
                        <img src="assets/logo.png" alt="logo" className='logo'></img>
                        <NavLink to='/' exact={true} activeClassName='active' className="title">
                            <div className='title'>Anemoneth</div>
                        </NavLink>
                    </div>
                    <div className="right">
                        
                    </div>
                </div>
            </div>
        )   
    }
}

export default Navbar




{/* <div className='infoWrapper'>
<div className='addrEl'>
    Address: {dispAddr}
</div>
<div className='fishEl'>
    FISH: {clwnblnc}
</div>
</div>
<div className='logOutWrapper'>
<LogoutButton className="logoutBtn" ></LogoutButton>
</div> */}
