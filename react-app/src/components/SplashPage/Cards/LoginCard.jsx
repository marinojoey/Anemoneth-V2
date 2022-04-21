import React from 'react'
import "../splashPage.scss"
import { Link } from "react-router-dom";

function LoginCard() {
  
  return (
      <Link to="/loginform" className='card login'>
        <h1 className='header'>Login</h1>
     </Link>
  )
}

export default LoginCard