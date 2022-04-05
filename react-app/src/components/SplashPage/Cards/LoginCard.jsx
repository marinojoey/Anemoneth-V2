import React from 'react'
import "../splashPage.scss"
import { Outlet, Link } from "react-router-dom";

function LoginCard() {
  
  return (
      <Link to="/loginform" className='card login'>
        <h1 className='header'>Login</h1>
        {/* <h5 className='instructions'>(Welcome back)</h5> */}
     </Link>
  )
}

export default LoginCard