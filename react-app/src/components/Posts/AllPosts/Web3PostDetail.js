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
                    The button above will retrieve the contents of a known CID. <br></br><br></br>To get a CID you will need to make a post (to your left) and then choose 'Submit Post + '. This will post to our database as well as to IPFS. The CID used for retrieval will print to the console. Retrieval can take up to a minute.
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