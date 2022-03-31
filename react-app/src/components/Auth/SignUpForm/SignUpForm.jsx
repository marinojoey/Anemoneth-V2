import './signUpForm.scss'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
// import { Navigate } from 'react-router-dom';
import { signUp } from '../../../store/session';

const SignUpForm = ({ ethAddr, MMConnected }) => {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  // const w2User = useSelector(state => state.session.w2User);

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
    //   const data = await dispatch(signUp(username, address, password));
    //   if (data) {
    //     setErrors(data)
    //   }
    // }

    const data = await dispatch(signUp(username, address, password, repeatPassword));
    if (data) {
      setErrors(data)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // if (w2User) {
  //   return <Navigate to='/' />;
  // }

  return (
    <form onSubmit={onSignUp} className="signupwrapper">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='subusernamewrapper'>
        <label>Username&nbsp; &nbsp; </label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          style={{border: 'none', borderRadius: '5px'}}
        ></input>
      </div>
      <div className='subaddresswrapper'>
        <label>Ethereum Address&nbsp; &nbsp; </label>
        <input
          type='text'
          name='address'
          onChange={updateAddress}
          value={address}
          style={{border: 'none', borderRadius: '5px'}}
        ></input>
      </div>
      <div className='subpasswordwrapper'>
        <label>Password&nbsp; &nbsp; </label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          style={{border: 'none', borderRadius: '5px'}}
        ></input>
      </div>
      <div className='subconfirmpasswordwrapper'>
        <label>Confirm Password&nbsp; &nbsp; </label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          style={{border: 'none', borderRadius: '5px'}}
        ></input>
      </div>
      <button type='submit' className='signupbutton'>Sign Up</button>
      {/* <div>Address auto-filled!</div> */}
    </form>
  );
};

export default SignUpForm;
