import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import PostDetail from "./PostDetail";
import './Posts.css';


const AllPosts = () => {
    const dispatch = useDispatch();

    const allPosts = useSelector(state => state.posts);

    useEffect(async () => {
       await dispatch(getAllPosts());
    }, [dispatch])

    console.log('--------', allPosts)

    const allPostsArr = Object.values(allPosts);
    const allPostsArrReverse = allPostsArr.reverse();

    return (
        <div className='all-posts-container'>
            {allPostsArrReverse.map(post => (
                <PostDetail post={post} key={post.id} />
            ))}
        </div>
    )
}

export default AllPosts;
