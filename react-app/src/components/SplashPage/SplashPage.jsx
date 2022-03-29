import './splashPage.scss';

import React from 'react'
import LoginForm from '../Auth/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import FryCard from './Cards/FryCard';
import SignupCard from './Cards/SignupCard';
import LoginCard from './Cards/LoginCard';

function SplashPage({ state, setState }) {


  return (
    <div className='splashcardwrapper'>
      <FryCard state={state} setState={setState}/>
      <SignupCard state={state} setState={setState}/>
      <LoginCard state={state} setState={setState}/>
    </div>
  )
}

export default SplashPage