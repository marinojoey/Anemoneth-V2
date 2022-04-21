import "../splashPage.scss"
import React from 'react'
import { Link } from "react-router-dom";

function SignupCard({ state, setState }) {

  return (
    <Link to="/signup" className='card signup'>
      <h1 className='header'>I'm new to AnemonETH</h1>
    </Link>
  )
}

export default SignupCard