import "../splashPage.scss"
import React, { useEffect } from 'react'
import { ethers } from "ethers";
import contractCall from "../../ContractCall/ContractCall";
import SignUpForm from "../../Auth/SignUpForm/SignUpForm";

const { ethereum } = window;

function SignupCard({ state, setState }) {

  const { MMConnected, w3User, ethAddr } = state;

  // useEffect(() => {
  //   contractCallHandler();
  // }, [MMConnected]);

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

  async function registerCall() {
    let contractInstance = await contractCall();
    if (await contractInstance.isRegistered(ethAddr)) {
        document.querySelector(".regiErrPlaceholder").textContent = "You are already registered! We're getting your info."
        setState(prevState => ({
          ...prevState,
          w3User: true
        }));
        let balanceOf = readable(await contractInstance.balanceOf(ethAddr));
        setState(prevState => ({
          ...prevState,
          fishblnc: balanceOf
        }));
    }
    else if(await contractInstance.isRegistered(ethAddr) === false) {
        await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
    }
  }

  // async function contractCallHandler() {
  //   let contractInstance = await contractCall();
  //   if (await contractInstance.isRegistered(ethAddr)) {
  //       setState({ ...state, w3User: true });
  //       let balanceOf = readable(await contractInstance.balanceOf(ethAddr));
  //       setState({ ...state, fishblnc: balanceOf });
  //       try {
  //         let currRedeemable = readable(await contractInstance.getCurrRedeemable());
  //         setState({ ...state, redeemable: currRedeemable })
  //       }
  //       catch{
  //         let currRedeemable = 0;
  //         setState({ ...state, redeemable: currRedeemable })
  //       }
  //   }
  // }

  if(!MMConnected && !w3User) {
    return (
      <div className='card'>
          <div className='heading'>
            <h1 className='header'>I'm new to AnemonETH</h1>
            <h5 className='instructions'>But not web3</h5>
          </div>
          <button className='body signupbutton' onClick={connectWalletHandler}>Connect Metamask</button>
      </div>
    )
  }
  else if(MMConnected && !w3User) {
    return (
      <div className='card'>
        <div className='heading'>
          <h1 className='header'>Metamask connected!</h1>
          <h5 className='instructions'>Please register wit AnemonETH's smart-contract</h5>
        </div>
        <button className='body signupbutton' onClick={registerCall}>Register</button>
        <div className="regiErrPlaceholder"></div>
        <div className="footer">You can read about our contract, economics and incentive structure here</div>
      </div>
    )
  }
  else if(MMConnected && w3User) {
    return (
      <div className='card'>
        <div className='heading'>
          <h1 className='header'>Sign-Up!</h1>
          <h5 className='instructions'>Last thing, we promise.</h5>
        </div>
        <div className="body loginbody"> <SignUpForm /></div>
      </div>
    )
  }
}

export default SignupCard