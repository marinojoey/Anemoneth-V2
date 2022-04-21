import React from 'react'
import CreatePostModal from '../Posts/CreatePostModal/CreatePostIndex';

import AllPosts from '../Posts/AllPosts/AllPosts';

import './homepage.scss';
import { useOutletContext } from 'react-router-dom';

function Homepage() {

  const [state, setState] = useOutletContext();
  const ethAddr = state?.ethAddr;

  return (
    <div className='homepageElwrapper'>
      <CreatePostModal />
      <AllPosts ethAddr={ethAddr} />
    </div>
  )
}

export default Homepage;
