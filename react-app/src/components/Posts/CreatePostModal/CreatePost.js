import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";
import './CreatePost.css';

// We can easily incorporate IPFS posting in this

const CreatePosting = ({ setShowModal }) => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [titleLength, setTitleLength] = useState(0);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const current_user = useSelector(state => state.session.user);
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
    if (titleLength < 3 || titleLength > 50) {
        titleInput = <div id='title-input' style={{color: 'red'}}>{titleLength} / 50</div>
    } else {
        titleInput = <div id='title-input' style={{color: 'var(--ethlightgray)'}}>{titleLength} / 50</div>
    }

    let web3s = new Web3Storage({
        token: process.env.REACT_APP_WEB3STORAGE_TOKEN
    });

    async function storeFiles() {
        const obj = { title: title, caption: caption }
        const blob = new Blob([JSON.stringify(obj)], {type: 'anemoneth/json'})
        const file = new File([blob], 'whatisthis.json');
        const cid = await web3s.put([file]);
        console.log('stored files with cid:', cid)
        return cid
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
                {/* <div id='title-input'>{titleLength} / 50</div> */}
                {titleInput}
                </div>
                {/* <div className="errors">
                    {errors.title ? `${errors.title}` : ''}
                </div> */}
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
                {/* <div className="errors">
                    {errors.caption ? `${errors.caption}` : ''}
                </div> */}
                <button id='post-submit' type="submit" disabled={!titleLength || titleLength>50 || !caption.length}>Submit Post</button>
                <button id='post-submit' type="submit" onClick={ storeFiles } disabled={!titleLength || titleLength>50 || !caption.length}>Submit Post to IPFS</button>
            </form>
        </div>
    )
}

export default CreatePosting;
