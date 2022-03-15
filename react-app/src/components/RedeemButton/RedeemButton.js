import React from 'react'
import contractCall from '../ContractCall/ContractCall'
import { ethers } from "ethers";
import './redeemButton.css'
const { ethereum } = window;


function RedeemButton({ setUser, setConn, setAddr1, setblnc, setclwnblnc, setDispAddr, setUsername, connected, addr1, clwnblnc }) {

    async function redeem() {
        if(ethereum) {
            let contractInstance = await contractCall();
            await contractInstance.redeem(addr1);
        } else if (!ethereum) {
            console.log("not connected")
        }
    }


  return (
    <>
        <div id="redeemCLWN" onClick={redeem}>Redeem</div>
    </>
  )
}

export default RedeemButton;