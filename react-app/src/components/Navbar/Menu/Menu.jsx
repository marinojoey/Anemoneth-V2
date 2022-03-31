import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoutButton from '../../Auth/LogoutButton/LogoutButton';
import ConRedeemBtn from '../../ConRedeemBtn/ConRedeemBtn';
import MmConnectBtn from './MmConnectBtn/MmConnectBtn';
import UpvoteCounter from '../../Admin/Earnings';
import contractCall from '../../ContractCall/ContractCall';
import './menu.scss';
import { ethers } from 'ethers';
const { ethereum } = window;


function Menu({ state, setState }) {

    // { redeemable, menuOpen, fishblnc, dispAddr, ethAddr, setMenuOpen }

    const ethAddr = state.ethAddr;
    const w3User = state.w3User;
    const menuOpen = state.menuOpen;
    const displayAddr = state.displayAddr;
    const fishblnc = state.fishblnc;
    const redeemable = state.redeemable;

    const [upvoteCount, setUpvoteCount] = useState(0);
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.usser);
    const user = current_user?.username;

    useEffect(() => {
        async function usr() {
            const res = await fetch(`/api/upvotes/user/${user}`);
            const count = await res.json()
    
            // console.log('===========', typeof(count))
    
            setUpvoteCount(count)   
        }
        usr();
    }, [dispatch, user])

    useEffect(() => {
        contractCallHandler();
        connectWalletHandler();
        console.log("ethAddr", ethAddr)
        console.log("w3User", w3User);
        console.log("menuOpen", menuOpen)
        console.log("dispAddr", displayAddr)
        console.log("fishblnc", fishblnc)
        console.log("redeemable", redeemable)
        console.log("---------")
    }, [menuOpen])

    async function connectWalletHandler() {
        if (ethereum) {
            await ethereum.request({method: 'eth_requestAccounts'})
            const prov = new ethers.providers.Web3Provider(ethereum);
            const signr = await prov.getSigner();
            const addr = await signr.getAddress();
            // setState(prevState => ({
            //     ...prevState,
            //     provider: prov
            // }));
            // setState(prevState => ({
            //     ...prevState,
            //     signer: signr
            // }));
            setState(prevState => ({
                ...prevState,
                ethAddr: addr
            }));
            // setState(prevState => ({
            //     ...prevState,
            //     MMConnected: true
            // }));
            makeDispAddr(addr);
        }
      }
    
    function makeDispAddr(numAddr) {
        const strAddr = numAddr.toString();
        const first = strAddr.slice(0,4);
        const last = strAddr.slice(-4);
        const dispAddr = `${first}...${last}`;
        setState(prevState => ({
            ...prevState,
            displayAddr: dispAddr
        }));
    }

    function readable(num) {
        return ethers.utils.formatUnits(parseInt(num).toString(), 18);
    }

    async function contractCallHandler() {
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered(ethAddr)) {
            setState(prevState => ({
                ...prevState,
                w3User: true
            }))
            let balanceOf = readable(await contractInstance.balanceOf(ethAddr));
            setState(prevState => ({
                ...prevState,
                fishblnc: balanceOf
            }))
            try {
                let currRedeemable = readable(await contractInstance.getCurrRedeemable());
                setState(prevState => ({
                    ...prevState,
                    redeemable: currRedeemable
                }))
            }
            catch{
                let currRedeemable = 0;
                setState(prevState => ({
                    ...prevState,
                    redeemable: currRedeemable
                }))
            }
        }
    }

    return (
        <div className={"menu " + (menuOpen && "active")} id="menu">
            <ul className={"list " + (menuOpen && "active")}>
                <li>
                    <span className='bold'>{user}</span> 
                </li>
                <li>
                    <span className='bold'>Addr: </span><span>{displayAddr}</span>
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
                <li onClick={() => setState(prevState => ({...prevState, menuOpen: !menuOpen }))}>
                    <Link to="/"> <LogoutButton className="btn logoutBtn" ></LogoutButton> </Link>
                </li>
                {(ethAddr === "0xae90d6C1360d095a03c4AAf378Bf20cEcdB27630") ? 
                    <li> <UpvoteCounter /> </li> :
                    <li></li> }
            </ul>
        </div>
    )
}

export default Menu
