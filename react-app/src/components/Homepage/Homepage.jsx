import React from 'react'
import CreatePostModal from '../Posts/CreatePostModal/CreatePostIndex';

import AllPosts from '../Posts/AllPosts/AllPosts';

import './homepage.scss';

function Homepage( { addr1 } ) {


  return (
    <div className='homepageElwrapper'>
      <CreatePostModal />
      <AllPosts addr1={addr1} />
    </div>
  )
}

export default Homepage;
