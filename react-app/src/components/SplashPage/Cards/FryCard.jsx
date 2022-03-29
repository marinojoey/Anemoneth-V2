import React from 'react'
import "../splashPage.scss"

function FryCard() {
  return (
    <div className='card'>
        <div className='heading'>
          <h1 className='header'>I'm new to web3</h1>
          <h5 className='instructions'>Show me around!</h5>
        </div>
        <div className='body frybody'>We'll teach you everything you need to know! Worry not, were operating on an Ethereum Test Network! That means we're using fake Ether!</div>
    </div>
  )
}

export default FryCard