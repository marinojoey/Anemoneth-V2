import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LogoutButton from '../../Auth/LogoutButton/LogoutButton';
import ConRedeemBtn from '../../ConRedeemBtn/ConRedeemBtn';
import MmConnectBtn from './MmConnectBtn/MmConnectBtn';
import './menu.scss';


function Menu({ redeemable, menuOpen, fishblnc, dispAddr, addr1, setMenuOpen }) {
    const [upvoteCount, setUpvoteCount] = useState(0);
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.user);
    const username = current_user.username;

    useEffect(async () => {
        const res = await fetch(`/api/upvotes/user/${username}`);
        const count = await res.json()

        // console.log('===========', typeof(count))

        setUpvoteCount(count)
    }, [dispatch, upvoteCount])

    return (
        <div className={"menu " + (menuOpen && "active")} id="menu">
            <ul className={"list " + (menuOpen && "active")}>
                <li>
                    <span className='bold'>{username}</span> 
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
                    <ConRedeemBtn className="btn MmConnectBtn" addr1={addr1} />
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

export default Menu
