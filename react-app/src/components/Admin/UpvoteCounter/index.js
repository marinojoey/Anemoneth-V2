import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';


const UpvoteCounter = () => {
    const [upvoteCount, setUpvoteCount] = useState({});
    const dispatch = useDispatch();

    useEffect(async () => {
        const res = await fetch(`/api/upvotes/totals`);
        const count = await res.json()

        setUpvoteCount(count)
    }, [dispatch, upvoteCount])

    return (
        <div className='post-detail-container'>
            <div className="leftwrapper">
                <div>{upvoteCount}</div>
            </div>
            <div className="rightwrapper">
            </div>
        </div>
    )
}

export default UpvoteCounter;
