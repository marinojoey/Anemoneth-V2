import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import { upvotePost } from '../../../store/upvotes';
import contractCall from "../../ContractCall/ContractCall";
import { useOutletContext } from "react-router-dom";
import { ethers } from "ethers";
import './Posts.scss';

const { ethereum } = window;

const PostDetail = ({ post }) => {

    const [state, setState] = useOutletContext();

    const ethAddr = state?.ethAddr;

    const [upvotes, setUpvotes] = useState([]);
    const [upvoteUpdate, setUpvoteUpdate] = useState(false);
    const dispatch = useDispatch();

    const postId = post.id;

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;
    const username = current_user.username;

    // const username = useParams();

    // Getting wallet addresses associated to users that made posts
    // const statePosts = useSelector(state => state.posts);
    const postersAddress = post.address;
    const usersAddress = ethAddr.ethAddr;

    useEffect(() => {
        async function disp() {
            await dispatch(getAllPosts());
            // await dispatch(getPostUpvotes());
            const res_upvotes = await fetch(`/api/upvotes/post/${postId}`);
            const upvote = await res_upvotes.json();

            setUpvotes(upvote);
            setUpvoteUpdate(false);
        }
        disp();
    }, [dispatch, upvoteUpdate, postId])


    const handleUpvote = async () => {
        await dispatch(upvotePost(username, postId));
        setUpvoteUpdate(true);
    };

    let upvoteCheck;
    if (upvotes[user_id]) {
        upvoteCheck = 
        <div>
            <i id='upvote' className="fa-solid fa-arrow-up-long" style={{ "color": "#ff7433" }}></i>
            <div id='upvote-count' style={{ "color": "#ff7433" }}>{Object.keys(upvotes).length}</div>
        </div>
    } else {
        upvoteCheck = 
        <div>
            <i id='un-upvote' className="fa-solid fa-arrow-up-long" style={{ "color": "#b0b0b0" }} onClick={() => handleUpvote()}></i>
            <div id='upvote-count' style={{ "color": "#b0b0b0" }}>{Object.keys(upvotes).length}</div>
        </div>
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

    async function tipFish() {
        let contractInstance = await contractCall();
        console.log("TIP FISH w2User's Address: ", usersAddress)
        console.log("TIP FISH Poster's Address: ", postersAddress)
        if (await contractInstance.isRegistered(usersAddress)) {
            await contractInstance.transfer(postersAddress, 2)
            //Add UI feedback
        }
    }

    async function tipEth() {
        ethereum.request({ method: 'eth_requestAccounts'});
        let _provider = new ethers.providers.Web3Provider(ethereum);
        let _signer = _provider.getSigner();
        let tx = {
            to: postersAddress,
            value: ethers.utils.parseEther(".0001")
        }
        await _signer.sendTransaction(tx)
            .then((txObj) => {
                console.log('txHash', txObj.hash)
            })
        console.log("passed");
    }

    return (
        <div className='post-detail-container'>
            <div className="votewrapper">
                {upvoteCheck}
            </div>
            <div className="mainwrapper">
                <div id ='post-content'>
                    <span id='post-heading'>
                        <div className="left">
                            <div className="title">{post.title}</div> 
                            <div className="username">@{post.username}</div>
                        </div>
                        <div className="right">
                            <button className="tipbtn" onClick={tipFish}>1 FISH</button>
                            <button className="tipbtn" onClick={tipEth}>1 GWEI</button>
                        </div>
                    </span>
                    <span id='post-caption'>
                        {post.caption}
                    </span>
                    <span id='metadata'>
                        {dateFormatted(post.created_at)} {post.address}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PostDetail;
