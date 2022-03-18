import LogoutButton from '../../Auth/LogoutButton/LogoutButton';
import ConRedeemBtn from '../../ConRedeemBtn/ConRedeemBtn';
import MmConnectBtn from './MmConnectBtn/MmConnectBtn';
import React from 'react'
import './menu.scss';


function Menu({ redeemable, menuOpen, clwnblnc, dispAddr, addr1, setMenuOpen }) {
  return (
    <div className={"menu " + (menuOpen && "active")} id="menu">
        <ul className={"list " + (menuOpen && "active")}>
            <li>
                <div className='addrEl'>Addr: {dispAddr} </div>
            </li>
            <li>
                <div className='fishEl'>FISH balance: {clwnblnc} </div>
            </li>
            <li>
                <div className='fishEl'>FISH redeemable: {redeemable} </div>
            </li>
            <li>
                <ConRedeemBtn className="btn MmConnectBtn" addr1={addr1} />    
            </li>
            <li>
                <MmConnectBtn className="btn MmConnectBtn" />
            </li>
            <li onClick={()=>setMenuOpen(false)}>
                <LogoutButton className="btn logoutBtn" ></LogoutButton>
            </li>
        </ul>
    </div>
  )
}

export default Menu