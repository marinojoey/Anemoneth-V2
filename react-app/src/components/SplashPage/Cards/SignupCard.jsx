import "../splashPage.scss"
import React, { useEffect } from 'react'
// import { ethers } from "ethers";
// import contractCall from "../../ContractCall/ContractCall";
// import SignUpForm from "../../Auth/SignUpForm/SignUpForm";
import { Outlet, Link } from "react-router-dom";


// const { ethereum } = window;

function SignupCard({ state, setState }) {

  // const { MMConnected, w3User, ethAddr } = state;

  // useEffect(() => {
  //   contractCallHandler();
  // }, [MMConnected]);

  // async function connectWalletHandler() {
  //   if (ethereum) {
  //       await ethereum.request({method: 'eth_requestAccounts'})
  //       const prov = new ethers.providers.Web3Provider(ethereum);
  //       setTimeout( async () => {
  //         setState(prevState => ({
  //           ...prevState,
  //           provider: prov
  //         }));
  //         const signr = await prov.getSigner();
  //         setState(prevState => ({
  //           ...prevState,
  //           signer: signr
  //         }));
  //         const addr = await signr.getAddress();
  //         setState(prevState => ({
  //           ...prevState,
  //           ethAddr: addr
  //         }));
  //         setState(prevState => ({
  //           ...prevState,
  //           MMConnected: true
  //         }));
  //         makeDispAddr(addr);
  //       }, 1300)
  //   }
  // }

  // function makeDispAddr(numAddr) {
  //   const strAddr = numAddr.toString();
  //   const first = strAddr.slice(0,4);
  //   const last = strAddr.slice(-4);
  //   const dispAddr = `${first}...${last}`;
  //   setState(prevState => ({
  //     ...prevState,
  //     displayAddr: dispAddr
  //   }));
  // }
  // function readable(num) {
  //   return ethers.utils.formatUnits(parseInt(num).toString(), 18);
  // }

  // async function registerCall() {
  //   let contractInstance = await contractCall();
  //   if (await contractInstance.isRegistered(ethAddr)) {
  //       document.querySelector(".regiErrPlaceholder").textContent = "You are already registered! We're getting your info."
  //       setState(prevState => ({
  //         ...prevState,
  //         w3User: true
  //       }));
  //       let balanceOf = readable(await contractInstance.balanceOf(ethAddr));
  //       setState(prevState => ({
  //         ...prevState,
  //         fishblnc: balanceOf
  //       }));
  //   }
  //   else if(await contractInstance.isRegistered(ethAddr) === false) {
  //       await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
  //   }
  // }

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

  return (
    // <div className='card signup'>
      <Link to="/signup" className='card signup'>
        <h1 className='header'>I'm new to AnemonETH</h1>
        <h5 className='instructions'>(But not web3)</h5>
     </Link>
    // </div>
  )
}

export default SignupCard