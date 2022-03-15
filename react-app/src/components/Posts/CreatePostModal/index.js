import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePost from './CreatePost';
import './CreatePost.css';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  }

  return (
    <>
      <div id='create-post' onClick={onClick}>Create Post</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}


export default CreatePostModal;
