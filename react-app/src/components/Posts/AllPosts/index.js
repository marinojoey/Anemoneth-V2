import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import React, { useEffect } from "react";
import PostDetail from "./PostDetail";
import Web3PostDetail from './Web3PostDetail';
import fish from '../../Images/fish.png';
import './Posts.scss';


const AllPosts = ( addr1 ) => {
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
                    <PostDetail addr1={addr1} post={post} key={post.id} />
                ))}
            </div>
            <div className="web3posts">
                <Web3PostDetail />
                <img src={fish} alt="fish" className='fishpic'></img>

            </div>
        </div>
    )
}

export default AllPosts;
