import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { Modal } from '../../../context/Modal';
import React, { useState } from 'react';
import CreatePost from './CreatePost';
import './CreatePost.scss';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  }

  let web3s = new Web3Storage({
  token: process.env.REACT_APP_WEB3STORAGE_TOKEN
  });

  async function retrieveFiles(cid) {
    const res = await web3s.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`)
    }
    const files = await res.files()
    const file = files[0]
    let fileText = await file.text();
    console.log(fileText)
  }

  return (
    <div className='createPostModalWrapper'>
      <div id='create-post' onClick={onClick}>Create Post</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost setShowModal={setShowModal} />
        </Modal>
      )}
      <div className='ipfs-retrieve'>
        <input type="text" className='cidinput' placeholder='   Content Identifier'></input>
        <button className='retrieveBtn' onClick={ () => retrieveFiles(document.querySelector('.cidinput').value) }>Retrieve</button>
      </div>
    </div>
  );
}

export default CreatePostModal;
