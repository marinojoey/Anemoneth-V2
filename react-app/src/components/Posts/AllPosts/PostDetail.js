import React from "react";
// import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import './Posts.css';


const PostDetail = ({ post }) => {
    // const current_user = useSelector(state => state.session.user);
    // const user_id = current_user.id;

    // const username = useParams();

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

    console.log('tiiiiiiime', dateFormatted(post.created_at))

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
