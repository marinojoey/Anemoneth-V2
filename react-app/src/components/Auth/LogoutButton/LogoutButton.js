import { logout } from '../../../store/session';
import { useDispatch } from 'react-redux';
import './logoutButton.scss';
import React from 'react';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logoutBtn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
