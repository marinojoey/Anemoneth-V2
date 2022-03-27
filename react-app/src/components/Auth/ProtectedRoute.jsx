import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const w2User = useSelector(state => state.session.w2User)
  return (
    <Route {...props}>
      {(w2User)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
