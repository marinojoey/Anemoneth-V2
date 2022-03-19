import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import { upvotePost } from '../../../store/upvotes';
import contractCall from "../../ContractCall/ContractCall";
import { ethers } from "ethers";
import CreatePostModal from "../CreatePostModal";
import './Posts.scss';

function Web3PostDetail() {
  return (
    <div className='post-detail-container'>
        <div className="votewrapper">
            <div id='upvote-count'>1</div>
        </div>
        <div className="mainwrapper">
            <div id ='post-content'>
                <span id='post-heading'>
                    <div className="left">
                        <div className="title">title example</div> 
                        <div className="username">@example</div>
                    </div>
                    <div className="right">
                        {/* <div>TIP: </div> */}
                        <button className="tipbtn">1 FISH</button>
                        <button className="tipbtn">1 GWEI</button>
                    </div>
                </span>
                <span id='post-caption'>
                    Test
                </span>
                <span id='metadata'>
                    asdasdfsadfasdfasdfasdfasdfasdfasdf
                </span>
            </div>
        </div>
    </div>
  )
}

export default Web3PostDetail