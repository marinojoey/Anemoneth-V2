import React from "react";
// import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import './Posts.css';


const PostDetail = ({ post }) => {
    // const current_user = useSelector(state => state.session.user);
    // const user_id = current_user.id;

    // const username = useParams();

    return (
        <div className='post-detail-container'>
            <NavLink to={`/posts/${post.id}`} className='post-navlink-container'>
                <div id='post-username'>
                    {post.username}:
                </div>
                <div id='post-title'>
                    {post.title}
                </div>
                <div id='post-caption'>
                    {post.caption}
                </div>
            </NavLink>
        </div>
    )
}

export default PostDetail;
