import React from "react";
import "./web3Login.scss";
import contractCall from "../ContractCall/ContractCall";
import Navbar from "../Navbar/Navbar";
import { ethers } from "ethers";
const { ethereum } = window;


function Web3Login({ state, setState }) {

    const MMConnected = state?.MMConnected;
    const w3User = state?.w3User;
    const ethAddr = state?.ethAddr;

    async function connectWalletHandler() {
        if (ethereum) {
            await ethereum.request({method: 'eth_requestAccounts'})
            const prov = new ethers.providers.Web3Provider(ethereum);
            setTimeout( async () => {
              setState(prevState => ({
                ...prevState,
                provider: prov
              }));
              const signr = await prov.getSigner();
              setState(prevState => ({
                ...prevState,
                signer: signr
              }));
              const addr = await signr.getAddress();
              setState(prevState => ({
                ...prevState,
                ethAddr: addr
              }));
              setState(prevState => ({
                ...prevState,
                MMConnected: true
              }));
              makeDispAddr(addr);
            }, 1300)
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
            let balanceOf = parseInt(await contractInstance.balanceOf(ethAddr), 16);
            setState(prevState => ({
                ...prevState,
                fishblnc: balanceOf
            }))
        } else {
            document.querySelector(".enterErrPlaceholder").textContent = "Something went wrong. Please make sure you're registered below!"
        }
    }

    async function registerCall() {
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered(ethAddr)) {
            document.querySelector(".regiErrPlaceholder").textContent = "You are already registered!"
        }
        await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
    }


    return (
        <div className='web3login'>
            <div className="notregistered">
                <button className='loginButtons' onClick={registerCall} >Register Here</button>
                <div id="details" className="web3logindiv">It will cost 1 Gwei (+ gas) and you will recieve 1 FISH in return.</div>
                <div className="regiErrPlaceholder"></div>
            </div>
        </div>
    );
};

export default Web3Login;
