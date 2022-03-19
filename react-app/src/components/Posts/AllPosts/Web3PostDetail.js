import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllPosts } from "../../../store/posts";
// import { upvotePost } from '../../../store/upvotes';
// import contractCall from "../../ContractCall/ContractCall";
// import { ethers } from "ethers";
// import CreatePostModal from "../CreatePostModal";
import './Posts.scss';

function Web3PostDetail() {
  return (
    <div className='post-detail-container'>
        <div className="votewrapper">
            <div id='upvote-count'></div>
        </div>
        <div className="mainwrapper">
            <div id ='post-content'>
                <span id='post-heading'>
                    <div className="left">
                        <div className="title">Retrieve files from IPFS!</div> 
                    </div>
                    <div className="right">
                        {/* <div>TIP: </div> */}
                        {/* <button className="tipbtn">1000 BTC</button>
                        <button className="tipbtn">1000 ETH</button> */}
                    </div>
                </span>
                <span id='post-caption'>
                    The button above will console.log the contents of a CID. <br></br><br></br>To get a CID you will need to make a post to your left and the choose 'Submit Post + '. This will post to our database as well as to IPFS.
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