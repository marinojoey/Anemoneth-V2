import React from 'react'
import "../splashPage.scss"
import { Outlet, Link } from "react-router-dom";

function LoginCard() {
  
  return (
    // <div className='card login'>
      <Link to="/loginform" className='card login'>
        <h1 className='header'>Click to login</h1>
     </Link>
    // </div>
  )
}

export default LoginCard