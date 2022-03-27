import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import React, { useEffect } from "react";
import PostDetail from "./DbPostDetail";
import Web3PostDetail from './IpfsPostDetail';
import fish from '../../Images/fish.png';
import './Posts.scss';


const AllPosts = ( ethAddr ) => {
    const dispatch = useDispatch();

    const allPosts = useSelector(state => state.posts);

    useEffect(() => {
        async function disp() {
            await dispatch(getAllPosts());
        }
       disp();
    }, [dispatch])

    const allPostsArr = Object.values(allPosts);
    const allPostsArrReverse = allPostsArr.reverse();

    return (
        <div className='all-posts-container'>
            <div className="web2posts">
                {allPostsArrReverse.map(post => (
                    <PostDetail ethAddr={ethAddr} post={post} key={post.id} />
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
