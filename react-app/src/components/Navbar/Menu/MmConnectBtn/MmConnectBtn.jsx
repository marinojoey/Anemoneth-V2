import './mmConnectBtn.scss'
import React from 'react'

const anemonethProxyAddress = "0xD44DB4fA1D66319f93e45a42a61a7cE8058930b3";
const tokenSymbol = 'FISH';
const tokenDecimals = 18;

const { ethereum } = window;

function MmConnectBtn() {

    async function connectToken() {
        if (ethereum) {
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                      address: anemonethProxyAddress, 
                      symbol: tokenSymbol,
                      decimals: tokenDecimals,
                    },
                },
            })
            console.log("success")
        }
    }

  return <div id="mmconnectbtn" onClick={connectToken}>Add token to Metamask</div>
}

export default MmConnectBtn