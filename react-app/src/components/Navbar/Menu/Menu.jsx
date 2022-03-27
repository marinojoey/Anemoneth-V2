import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LogoutButton from '../../Auth/LogoutButton/LogoutButton';
import ConRedeemBtn from '../../ConRedeemBtn/ConRedeemBtn';
import MmConnectBtn from './MmConnectBtn/MmConnectBtn';
import UpvoteCounter from '../../Admin/Earnings';
import './menu.scss';


function Menu({ redeemable, menuOpen, fishblnc, dispAddr, ethAddr, setMenuOpen }) {
    const [upvoteCount, setUpvoteCount] = useState(0);
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.w2User);
    const w2User = current_user.username;
    console.log(w2User)

    useEffect(() => {
        async function usr() {
            const res = await fetch(`/api/upvotes/w2User/${w2User}`);
            const count = await res.json()
    
            // console.log('===========', typeof(count))
    
            setUpvoteCount(count)   
        }
        usr();
    }, [dispatch, w2User])

    if(ethAddr === "0xae90d6C1360d095a03c4AAf378Bf20cEcdB27630") {
        return (
            <div className={"menu " + (menuOpen && "active")} id="menu">
                <ul className={"list " + (menuOpen && "active")}>
                    <li>
                        <span className='bold'>{w2User}</span> 
                    </li>
                    <li>
                        <span className='bold'>Addr: </span><span>{dispAddr}</span>
                    </li>
                    <li>
                        <span className='bold'>FISH balance: </span><span>{fishblnc}</span>
                    </li>
                    <li>
                        <span className='bold'>FISH redeemable: </span><span>{redeemable}</span>
                    </li>
                    <li>
                        <span className='bold'>My total upvotes: </span><span>{upvoteCount}</span>
                    </li>
                    <li>
                        <ConRedeemBtn className="btn MmConnectBtn" ethAddr={ethAddr} />
                    </li>
                    <li>
                        <MmConnectBtn className="btn MmConnectBtn" />
                    </li>
                    <li onClick={() => setMenuOpen(false)}>
                        <LogoutButton className="btn logoutBtn" ></LogoutButton>
                    </li>
                    <li>
                        <UpvoteCounter />
                    </li>
                </ul>
            </div>
        )
    }
    else if(ethAddr !== "0xae90d6C1360d095a03c4AAf378Bf20cEcdB27630") {
        return (
            <div className={"menu " + (menuOpen && "active")} id="menu">
                <ul className={"list " + (menuOpen && "active")}>
                    <li>
                        <span className='bold'>{w2User}</span> 
                    </li>
                    <li>
                        <span className='bold'>Addr: </span><span>{dispAddr}</span>
                    </li>
                    <li>
                        <span className='bold'>FISH balance: </span><span>{fishblnc}</span>
                    </li>
                    <li>
                        <span className='bold'>FISH redeemable: </span><span>{redeemable}</span>
                    </li>
                    <li>
                        <span className='bold'>My total upvotes:</span><span>{upvoteCount}</span>
                    </li>
                    <li>
                        <ConRedeemBtn className="btn MmConnectBtn" ethAddr={ethAddr} />
                    </li>
                    <li>
                        <MmConnectBtn className="btn MmConnectBtn" />
                    </li>
                    <li onClick={() => setMenuOpen(false)}>
                        <LogoutButton className="btn logoutBtn" ></LogoutButton>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu
