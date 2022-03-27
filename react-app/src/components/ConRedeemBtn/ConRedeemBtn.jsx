import contractCall from '../ContractCall/ContractCall'
import './ConRedeemBtn.scss'
import React from 'react'

const { ethereum } = window;


function ConRedeemBtn({ ethAddr }) {

    async function redeem() {
        if(ethereum) {
            let contractInstance = await contractCall();
            await contractInstance.redeem({value: 1000000000});
        } else if (!ethereum) {
            console.log("not MMConnected")
        }
    }
    return  <div id="redeemFISH" onClick={redeem}>Redeem</div>
}

export default ConRedeemBtn;