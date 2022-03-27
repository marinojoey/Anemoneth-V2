import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import { Redirect } from 'react-router-dom';
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
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}className="loginwrapper" >
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='usernamewrapper'>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div className='passwordwrapper'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button type='submit' className='web2btn'>Login</button>
    </form>
  );
};

export default LoginForm;
