import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";
import './CreatePost.scss';

const CreatePosting = ({ setShowModal }) => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [titleLength, setTitleLength] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.w2User);
    const user_id = current_user.id;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {user_id, title, caption};
        const data = await dispatch(addPost(info));

        if (data) {
            // const errors = {}

            // data.forEach(error => {
            //     const errLabel = error.split(' : ')[0];
            //     const errMessage = error.split(' : ')[1];
            //     errors[errLabel] = errMessage;
            // });

            // setErrors(errors);
            return;
        } else {
            setShowModal(false);
            history.push('/');
        }
    }

    let titleInput;
    if (titleLength < 3 || titleLength > 25) {
        titleInput = <div id='title-input' style={{color: 'red'}}>{titleLength} / 25</div>
    } else {
        titleInput = <div id='title-input' style={{color: 'var(--ethlightgray)'}}>{titleLength} / 25</div>
    }

    return (
        <div className='post-container'>
            <div id='create-header'>Create a post</div>
            <form className='post-form' onSubmit={handleSubmit}>
                <div className='post-inputs'>
                    <input
                        name='title'
                        type='textarea'
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value); setTitleLength(e.target.value.length)}}
                    />
                {titleInput}
                </div>
                <div className='post-inputs'>
                    <textarea
                        name='caption'
                        type='textarea'
                        rows='10'
                        cols='50'
                        placeholder="Post Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>
                <button id='post-submit' type="submit" disabled={!titleLength || titleLength>25 || !caption.length}>Submit Post</button>
            </form>
        </div>
    )
}

export default CreatePosting;
