import './loginForm.scss'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const hi = useSelector(state => state);
  console.log('STAAAAAAAATE', hi)

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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className="loginwrapper" >
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='usernamewrapper'>
        <label htmlFor='username'>Username: </label>
        <input
          name='username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div className='passwordwrapper'>
        <label htmlFor='password'>Password: </label>
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
