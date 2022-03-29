import './splashPage.scss';

import React from 'react'
import LoginForm from '../Auth/LoginForm/LoginForm';
import { Link, useOutletContext } from 'react-router-dom';
import FryCard from './Cards/FryCard';
import SignupCard from './Cards/SignupCard';
import LoginCard from './Cards/LoginCard';

function SplashPage() {

  const [state, setState] = useOutletContext();

  return (
    <div className='splashcardwrapper'>
      <div className='pop'>
        <FryCard state={state} setState={setState}/>
        <SignupCard state={state} setState={setState}/>
        <LoginCard state={state} setState={setState}/>
      </div>
    </div>
  )
}

export default SplashPage