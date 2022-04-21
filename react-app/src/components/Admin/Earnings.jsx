import contractCall from "../ContractCall/ContractCall";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import './earnings.scss'

const { ethereum } = window;


const UpvoteCounter = () => {
    const [addresses, setAddresses] = useState([]);
    const [totalUpvoteCount, setTotalUpvoteCount] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function arr() {
            const res = await fetch(`/api/upvotes/totals`);
            const count = await res.json()
    
            const addr = Object.keys(count)
            const userCounts = Object.values(count)
            setAddresses(addr)
            setTotalUpvoteCount(userCounts)
        }
        arr();
    }, [dispatch])

    let lowEarners = [];
    let midEarners = [];
    let highEarners = [];

    function makeArr() {
        console.log("Before processing: ", addresses)
        console.log("Before processing: ", totalUpvoteCount)
        for(let i=0; i<= addresses.length; i++) {
            if(totalUpvoteCount[i] > 0 && totalUpvoteCount[i] <= 2) {
                lowEarners.push(addresses[i]);
            }
            else if(totalUpvoteCount[i] > 2 && totalUpvoteCount[i] <= 3) {
                midEarners.push(addresses[i]);
            } else if (totalUpvoteCount[i] > 3) {
                highEarners.push(addresses[i]);
            }
        }
    }

    async function allocate() {
        makeArr();
        if( ethereum  ) {
            // console.log("lowEarners: ", lowEarners)
            // console.log("midEarners: ", midEarners)
            // console.log("higEarners: ", highEarners)
            const contractInstance = await contractCall();
            await contractInstance.weeklyEarnings(lowEarners, midEarners, highEarners);
            // console.log("Tx is being processed")
        } else console.log("Something went wrong")

    }
    // console.log("address: ", addresses)
    // console.log("amount: ", totalUpvoteCount)

    return   <button className="earningsbtn" onClick={allocate} >Weekly Earnings</button>
}

export default UpvoteCounter;

// && ( lowEarners.length !== 0 || midEarners.length !== 0 || highEarners.length !== 0 )