import React from 'react'
import CreatePostModal from '../Posts/CreatePostModal/CreatePostIndex';

import AllPosts from '../Posts/AllPosts/AllPosts';

import './homepage.scss';

function Homepage( { ethAddr } ) {


  return (
    <div className='homepageElwrapper'>
      <CreatePostModal />
      <AllPosts ethAddr={ethAddr} />
    </div>
  )
}

export default Homepage;
