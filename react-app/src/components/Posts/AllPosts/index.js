import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import React, { useEffect } from "react";
import PostDetail from "./PostDetail";
import './Posts.scss';


const AllPosts = () => {
    const dispatch = useDispatch();

    const allPosts = useSelector(state => state.posts);

    useEffect(() => {
        async function disp() {
            await dispatch(getAllPosts());
        }
       disp();
    }, [dispatch])

    // console.log('--------', allPosts)

    const allPostsArr = Object.values(allPosts);
    const allPostsArrReverse = allPostsArr.reverse();

    return (
        <div className='all-posts-container'>
            <div className="web2posts">
                {allPostsArrReverse.map(post => (
                    <PostDetail post={post} key={post.id} />
                ))}
            </div>
            <div className="web3posts">
                <div className='post-container'>
                    <div id='username'>
                        Posted by u/Joey on Mar-17-2022
                    </div>
                    <div id='title'>
                        Test-post
                    </div>
                    <div id='caption'>
                        Test Caption
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllPosts;