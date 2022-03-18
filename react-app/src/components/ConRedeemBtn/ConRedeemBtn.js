import contractCall from '../ContractCall/ContractCall'
import './ConRedeemBtn.css'
import React from 'react'

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
    return  <div id="redeemFISH" onClick={redeem}>Redeem</div>
}

export default ConRedeemBtn;