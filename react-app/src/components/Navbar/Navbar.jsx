import './navbar.scss'
import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../Images/logo.png';
import { ethers } from 'ethers';
const { ethereum } = window;




function Navbar({ state, setState }) {

    const MMConnected = state?.MMConnected;
    const w3User = state?.w3User;
    const menuOpen = state?.menuOpen;

    async function menuOpenHandler() {
        setState(prevState => ({...prevState, menuOpen: !menuOpen }));

    }
    
    return (
        <div className={'navbar ' + (menuOpen && 'active')} id="navbar">
            <div className='wrapper'>
                <div className="left">
                    <NavLink to={(w3User && MMConnected) ? '/homepage' : '/'} exact={`${true}`} activeclassname='active' className="title">
                        <img src={logo} alt="logo" className='logo'></img>
                        <div className='title'>AnemonETH</div>
                    </NavLink>
                </div>
                <div className="right">
                    <div className='hamburger' onClick={menuOpenHandler}>
                        <span className='line1'></span>
                        <span className='line2'></span>
                        <span className='line3'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar