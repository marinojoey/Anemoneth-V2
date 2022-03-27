import React from "react";
import './Posts.scss';

function DashDetail() {
  return (
    <div className='post-detail-container'>
        <div className="votewrapper">
            <div id='upvote-count'></div>
        </div>
        <div className="mainwrapper">
            <div id ='post-content'>
                <span id='post-heading'>
                    <div className="left">
                        <div className="title">NEW IDEA: Dashboard</div> 
                    </div>
                    <div className="right">
                        {/* <div>TIP: </div> */}
                        {/* <button className="tipbtn">1000 BTC</button>
                        <button className="tipbtn">1000 ETH</button> */}
                    </div>
                </span>
                <span id='post-caption'>
                    My Idea is to have the left column to function more or less like reddit and have it's content displayed more or less like reddit mobile. <br></br><br></br> A Dashboard will be sitting here. It will function much the same as reddit, with popular "widgets" being upvoted by the community. One difference being you can pin your own widgets to the top. SUDOKU, MEDITATION, myNoise.net, WORDLE. This shouldn't have anything in this section that is native to iOS: calendar, reminders, youtube app. Ideally it would be things that offer wellness not stress, and that you want to spend time on it everyday because its good for you. 
                </span>
                <span id='metadata'>
                    asdasdfsadfasdfasdfasdfasdfasdfasdf
                </span>
            </div>
        </div>
    </div>
  )
}

export default DashDetail