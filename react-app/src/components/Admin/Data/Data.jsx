import React from 'react'
import "./data.scss";
import OneFishNR from "../../Images/1-FISH-NR.png"
import OneFish5R from "../../Images/1-FISH-5R.png"
import OneFishWR from "../../Images/1-FISH-WR.png"
import TenFishNR from "../../Images/10-FISH-NR.png"
import TenFish5R from "../../Images/10-FISH-NR.png"
import TenFishWR from "../../Images/10-FISH-WR.png"

function Data() {
  return (
    <div className='dataPage'>
        <div className='graph one'>
            <img src={OneFishNR} alt="data"></img>
        </div>
        <div className='graph two'>
            <img src={OneFish5R} alt="data"></img>
        </div>
        <div className='graph three'>
            <img src={OneFishWR} alt="data"></img>
        </div>
        <div className='graph four'>
            <img src={TenFishNR} alt="data"></img>
        </div>
        <div className='graph five'>
            <img src={TenFish5R} alt="data"></img>
        </div>
        <div className='graph six'>
            <img src={TenFishWR} alt="data"></img>
        </div>
    </div>
  )
}

export default Data