import React, { useEffect } from 'react'
import CreatePostModal from '../Posts/CreatePostModal';
import contractCall from '../ContractCall/ContractCall';
import AllPosts from '../Posts/AllPosts';
import './homepage.scss';


function Homepage( { setUser, setRedeemable, setclwnblnc, addr1 } ) {

  async function contractCallHandler() {
    let contractInstance = await contractCall();
    if (await contractInstance.isRegistered(addr1)) {
        setUser(true)
        let balanceOf = parseInt(await contractInstance.balanceOf(addr1), 16);
        setclwnblnc(balanceOf);
        let currRedeemable = parseInt(await contractInstance.getCurrRedeemable(addr1), 16)
        setRedeemable(currRedeemable);
    }
  }

  useEffect(() => {
    contractCallHandler();
  },)


  return (
    <div className='homepageElwrapper'>
      <CreatePostModal />
      <AllPosts addr1={addr1} />
    </div>
  )
}

export default Homepage;
