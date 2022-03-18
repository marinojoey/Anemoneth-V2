import './mmConnectBtn.scss'
import React from 'react'

const anemonethProxyAddress = "0x5ceeB384B6224874938c4280A9E545c61BC06984";
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
                    //   image: tokenImage,
                    },
                  },
            })
            // provider = new ethers.providers.Web3Provider(ethereum);
            // signer = await provider.getSigner();
            // addr = await signer.getAddress();
            console.log("success")
        }
    }

  return <div id="mmconnectbtn" onClick={connectToken}>Add token to Metamask</div>
}

export default MmConnectBtn