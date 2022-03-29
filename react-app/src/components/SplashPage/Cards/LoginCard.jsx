import React from 'react'
import "../splashPage.scss"
import LoginForm from '../../Auth/LoginForm/LoginForm'

function LoginCard() {
  
  return (
    <div className='card'>
        <div className='heading'>
          <h1 className='header'>Coming Back?</h1>
        </div>
        <div className='body loginbody'> <LoginForm /> </div>
    </div>
  )
}

export default LoginCard