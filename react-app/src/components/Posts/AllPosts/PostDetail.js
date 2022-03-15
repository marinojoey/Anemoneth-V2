import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { getAllPosts } from "../../../store/posts";
import { getPostUpvotes, upvotePost } from '../../../store/upvotes';
import './Posts.css';


const PostDetail = ({ post }) => {
    const [upvotes, setUpvotes] = useState([]);
    const [upvoteUpdate, setUpvoteUpdate] = useState(false);
    const dispatch = useDispatch();

    const postId = post.id;

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;
    const username = current_user.username;

    // const username = useParams();


    useEffect(async () => {
        await dispatch(getAllPosts());

        const res_upvotes = await fetch(`/api/upvotes/post/${postId}`);
        const upvote = await res_upvotes.json();

        setUpvotes(upvote);
        setUpvoteUpdate(false);
    }, [dispatch, upvoteUpdate])


    const handleUpvote = async () => {
        await dispatch(upvotePost(username, postId));
        setUpvoteUpdate(true);
    };

    let upvoteCheck;
    if (upvotes[user_id]) {
        upvoteCheck = <i id='upvote' className="fa-solid fa-arrow-up-long" style={{ "color": "#ff7433" }}></i>
    } else {
        upvoteCheck = <i id='un-upvote' className="fa-solid fa-arrow-up-long" style={{ "color": "#f2e8e4" }} onClick={() => handleUpvote()}></i>
    }

    // const handleUnUpvote = async () => {
    //     await dispatch(removeUpvote(username, postId));
    //     setUpvoteUpdate(true);
    // };





    // Need to make a check, created_at VS updated_at
        // Posted by u/demo 12 hours ago
        // * Edited by u/demo 12 hours ago

    // const getToday = () => {
    //     const today = new Date();

    //     const yyyy = today.getFullYear();
    //     const mm = (today.getMonth() + 1).toString().padStart(2, "0");
    //     const dd = (today.getDate()).toString().padStart(2, "0");
    //     const hh = (today.getHours()).toString().padStart(2, "0");
    //     const min = (today.getMinutes()).toString().padStart(2, "0");

    //     return yyyy + "-" + mm + "-" + dd + ' ' + hh + ':' + min;
    // };

    const dateFormatted = (date) => {
        const dateSplit = date.split(' ');
        const newDate = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[3];
        return newDate;
    }

    // console.log('tiiiiiiime', dateFormatted(post.created_at))

    return (
        <div className='post-detail-container'>
            {/* <NavLink to={`/posts/${post.id}`} className='post-navlink-container'>
            </NavLink> */}
            <div id='post-username'>
                Posted by u/{post.username} on {dateFormatted(post.created_at)}
            </div>
            <div id='post-title'>
                {post.title}
            </div>
            <div id='post-caption'>
                {post.caption}
            </div>
        </div>
    )
}

export default PostDetail;
