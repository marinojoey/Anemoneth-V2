import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/Auth/LoginForm/LoginForm';
import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
// import AllPosts from './components/Posts/AllPosts';

import Homepage from './components/Homepage/Homepage';
import Login from './components/Web3Login/Web3'
import Navbar from './components/Navbar/Navbar';
import Web2Login from './components/Web2Login/Web2Login';
export const AuthContext = createContext();

function App() {
  const [isUser, setUser] = useState(false);
  const [connected, setConn] = useState(false);
  const [addr1, setAddr1] = useState(0);
  const [dispAddr, setDispAddr] = useState("")
  const [clwnblnc, setclwnblnc] = useState(0)
  const [username, setUsername] = useState("")

  const user = useSelector(state => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  
  if(!user) {
    return (
        <BrowserRouter>
          <Navbar />
          <Web2Login />
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
          </Switch>
        </BrowserRouter>
      );
  }
  else if (user) {
    return (
      <BrowserRouter>
        <Navbar clwnblnc={clwnblnc} dispAddr={dispAddr} username={username} connected={connected} />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/' exact={true} >
            { (isUser) ?
              <Homepage isUser={isUser} connected={connected} addr1={addr1} /> :
              <Login setUser={setUser} setConn={setConn} setAddr1={setAddr1} setclwnblnc={setclwnblnc} setDispAddr={setDispAddr} setUsername={setUsername} addr1={addr1} connected={connected} />
            }
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
