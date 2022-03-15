import './app.scss'
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/Auth/LoginForm/LoginForm';
import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
// import AllPosts from './components/Posts/AllPosts';

import Homepage from './components/Homepage/Homepage';
import Web3Login from './components/Web3Login/Web3Login'
import Navbar from './components/Navbar/Navbar';
import Web2Login from './components/Web2Login/Web2Login';
export const AuthContext = createContext();

function App() {
  const [isUser, setUser] = useState(false);
  const [connected, setConn] = useState(false);
  const [addr1, setAddr1] = useState(0);
  const [dispAddr, setDispAddr] = useState("")
  const [clwnblnc, setclwnblnc] = useState(0)

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
        <div className='app'>
          <BrowserRouter>
            <Navbar />
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <Switch>
                  <Route path='/login' exact={true}>
                    <LoginForm />
                  </Route>
                  <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                  </Route>
                </Switch>
                <Web2Login />
              </div>
              <div className='web3wrapper'>
                <Web3Login isUser={isUser} setConn={setConn} setAddr1={setAddr1} setclwnblnc={setclwnblnc} setDispAddr={setDispAddr} addr1={addr1} connected={connected} />
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if (user && isUser) {
    return (
      <div className='app'>
        <BrowserRouter>
        <Navbar clwnblnc={clwnblnc} dispAddr={dispAddr} connected={connected} />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/' exact={true} >
              <Homepage connected={connected} addr1={addr1} setUser={setUser} setConn={setConn} setAddr1={setAddr1} setclwnblnc={setclwnblnc} setDispAddr={setDispAddr} clwnblnc={clwnblnc} isUser={isUser} /> 
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
