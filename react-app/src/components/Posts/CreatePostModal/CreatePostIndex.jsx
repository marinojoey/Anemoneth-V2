import { Modal } from '../../../context/Modal';
import React, { useState } from 'react';
import CreatePost from './CreatePost';
import './CreatePost.scss';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  }

  // async function dashboardSearch() {

  // }

  return (
    <div className='createPostModalWrapper'>
      <div id='create-post' onClick={onClick}>Create Post</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost setShowModal={setShowModal} />
        </Modal>
      )}
      {/* <div className='dash-search'>
        <input type="text" className='searchval' placeholder='   games, news, artists, events, twitter, endless animal facts...'></input>
        <button className='retrieveBtn' onClick={ () => dashboardSearch(document.querySelector('.searchVal').value) }>Search dashboard</button>
      </div> */}
    </div>
  );
}

export default CreatePostModal;
