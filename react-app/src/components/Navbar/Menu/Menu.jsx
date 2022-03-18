import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LogoutButton from '../../Auth/LogoutButton/LogoutButton';
import ConRedeemBtn from '../../ConRedeemBtn/ConRedeemBtn';
import MmConnectBtn from './MmConnectBtn/MmConnectBtn';
import './menu.scss';


function Menu({ redeemable, menuOpen, clwnblnc, dispAddr, addr1, setMenuOpen }) {
    const [upvoteCount, setUpvoteCount] = useState(0);
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.user);
    const username = current_user.username;

    useEffect(() => {
        async function fetch() {
            const res = await fetch(`/api/upvotes/user/${username}`);
            const count = await res.json()
            // console.log('===========', typeof(count))
            setUpvoteCount(count)
        }
        fetch();
    }, [dispatch, upvoteCount])

    return (
        <div className={"menu " + (menuOpen && "active")} id="menu">
            <ul className={"list " + (menuOpen && "active")}>
                <li>{username}</li>
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
                    <div className='totalUpvotes'>My total upvotes: {upvoteCount}</div>
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
