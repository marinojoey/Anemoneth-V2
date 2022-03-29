import React from 'react'
import "../splashPage.scss"
import { Link } from 'react-router-dom'

function FryCard() {
  return (
    // <div className='card fry'>
      <Link to="/fry" className='card fry'>
        <h1 className='header'>I'm new to web3</h1>
        <h5 className='instructions'>Show me around!</h5>
      </Link>
    // </div>
  )
}

export default FryCard