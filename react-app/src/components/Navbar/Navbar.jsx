import './navbar.scss'
import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../Images/logo.png';



function Navbar({ w3User, w2User, menuOpen, setMenuOpen }) {

    if (w2User && w3User) {
        return (
            <div className={'navbar ' + (menuOpen && 'active')} id="navbar">
                <div className='wrapper'>
                    <div className="left">
                        <NavLink to='/' exact={true} activeClassName='active' className="title">
                            <img src={logo} alt="logo" className='logo'></img>
                            <div className='title'>AnemonETH</div>
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
    else if (!w2User || !w3User) {
        return (
            <div className={'navbar ' + (menuOpen && 'active')} id="navbar">
                <div className='wrapper'>
                    <div className="left">
                        <NavLink to='/' exact={true} activeClassName='active' className="title">
                            <img src={logo} alt="logo" className='logo'></img>
                            <div className='title'>AnemonETH</div>
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
