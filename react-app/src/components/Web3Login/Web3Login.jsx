import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./web3Login.scss";
import { ethers } from "ethers";
import contractCall from "../ContractCall/ContractCall";
const { ethereum } = window;

function Web3Login({ setUser, setConn, setAddr1, setblnc, setclwnblnc, setDispAddr, connected, addr1 }) {

    // let displayAddr;
    // let provider;
    // let signer;
    // let addr;
    // useEffect(() => {
    //     connectWalletHandler();
    // }, [])
    // async function connectWalletHandler() {
    //     if (ethereum) {
    //         await ethereum.request({method: 'eth_requestAccounts'})
    //         provider = new ethers.providers.Web3Provider(ethereum);
    //         signer = await provider.getSigner();
    //         addr = await signer.getAddress();
    //         makeDispAddr(addr);
    //         setAddr1(addr);
    //         setConn(true);
    //     }
    //     else {
    //         alert("Please install MetaMask to connect your wallet and try again");
    //     }
    // }
    // function makeDispAddr(numAddr) {
    //     const strAddr = numAddr.toString();
    //     const first = strAddr.slice(0,4);
    //     const last = strAddr.slice(-4);
    //     displayAddr = `${first}...${last}`;
    //     setDispAddr(displayAddr);
    // }

    async function contractCallHandler() {
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered(addr1)) {
            setUser(true)
            let balanceOf = parseInt(await contractInstance.balanceOf(addr1), 16);
            setclwnblnc(balanceOf);
        } else console.log("Please register")
    }

    async function registerCall() {
        let contractInstance = await contractCall();
        await contractInstance.register({ value: 1000000000, gasLimit: 25000000 });
    }

    if(!connected) {
        return (
            <div className='web3login'>
                {/* <div className='loginPiecesContainer'>
                    <div id="title" className='loginPieces'>
                        <h1>Anemoneth</h1>
                        <h4>Connect with friends and the decentralised world around you on Anemoneth</h4>
                    </div>
                    <div className='loginPieces'>
                        <button id="connectWallet" className="loginButtons" onClick={connectWalletHandler}>Connect Wallet</button>
                    </div>
                </div> */}
            </div>
        );
    }
    else if (connected) {
        return (
            <div className='web3login'>
                <div className='loginPiecesContainer'>
                    <div className='loginPieces'>
                        <div>Already registered?</div>
                        <br></br>
                        <button id="calltbtn" className="loginButtons" onClick={contractCallHandler}>Enter the Anemone</button>
                        <br></br>
                        <br></br>
                        <div>If not,</div>
                        <br></br>
                        <div>It will cost 1 Gwei (+ gas) and you will recieve 1 CLWN in return.</div>
                        <br></br>
                        <button id="regbtn" className='loginButtons' onClick={registerCall} >Register</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Web3Login;
