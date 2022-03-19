import React, { useEffect } from 'react'
import CreatePostModal from '../Posts/CreatePostModal';
import contractCall from '../ContractCall/ContractCall';
import AllPosts from '../Posts/AllPosts';
import { ethers } from 'ethers';
import './homepage.scss';

function Homepage( { setUser, setRedeemable, setclwnblnc, addr1 } ) {

  // function readable(num) {
  //   return ethers.utils.formatUnits(parseInt(num).toString(), 18);
  // }

  // async function contractCallHandler() {
  //   let contractInstance = await contractCall();
  //   if (await contractInstance.isRegistered(addr1)) {
  //       setUser(true)
  //       let balanceOf = readable(await contractInstance.balanceOf(addr1));
  //       setclwnblnc(balanceOf);
  //       try {
  //       let currRedeemable = readable(await contractInstance.getCurrRedeemable());
  //       setRedeemable(currRedeemable);
  //       }
  //       catch{
  //         let currRedeemable = 0;
  //         setRedeemable(currRedeemable);
  //       }
  //   }
  //   console.log("the entire thing")
  // }

  // useEffect(() => {

  //   function readable(num) {
  //     return ethers.utils.formatUnits(parseInt(num).toString(), 18);
  //   }

  //   async function contractCallHandler() {
  //     let contractInstance = await contractCall();
  //     if (await contractInstance.isRegistered(addr1)) {
  //         setUser(true)
  //         let balanceOf = readable(await contractInstance.balanceOf(addr1));
  //         setclwnblnc(balanceOf);
  //         console.log("set Clwn")
  //         try {
  //         let currRedeemable = readable(await contractInstance.getCurrRedeemable());
  //         setRedeemable(currRedeemable);
  //         }
  //         catch{
  //           let currRedeemable = 0;
  //           setRedeemable(currRedeemable);
  //         }
  //     }
  //     console.log("the entire thing")
  //   }
  //   contractCallHandler();

  // },[setUser, setRedeemable, setclwnblnc, addr1])


  return (
    <div className='homepageElwrapper'>
      <CreatePostModal />
      <AllPosts addr1={addr1} />
    </div>
  )
}

export default Homepage;
