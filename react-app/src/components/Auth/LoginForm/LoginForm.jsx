import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import './loginForm.scss'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [    errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const w2User = useSelector(state => state.session.w2User);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (w2User) {
    return <Navigate to='/' />;
  }

  return (
      <div className='formWrapper'>
        <form onSubmit={onLogin}className="loginwrapper" >
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='usernamewrapper'>
            <label htmlFor='username'>Username&nbsp;&nbsp;</label>
            <input
              name='username'
              type='text'
              placeholder='  Username'
              value={username}
              onChange={updateUsername}
              style={{border: 'none', borderRadius: '5px'}}
            />
          </div>
          <div className='passwordwrapper'>
            <label htmlFor='password'>Password&nbsp;&nbsp;</label>
            <input
              name='password'
              type='password'
              placeholder='  Password'
              value={password}
              onChange={updatePassword}
              style={{border: 'none', borderRadius: '5px'}}
            />
          </div>
          <button type='submit' className='web2btn'>Login</button>
        </form>
      </div>
  );
};

export default LoginForm;
