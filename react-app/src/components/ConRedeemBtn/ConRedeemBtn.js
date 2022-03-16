import React from 'react'
import contractCall from '../ContractCall/ContractCall'
import { ethers } from "ethers";
import './ConRedeemBtn.css'
const { ethereum } = window;


function ConRedeemBtn({ addr1 }) {

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

export default ConRedeemBtn;