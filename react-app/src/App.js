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
import Menu from './components/Navbar/Menu/Menu';
import Web2Login from './components/Web2Login/Web2Login';
import { ethers } from "ethers";
import contractCall from './components/ContractCall/ContractCall';
// import ConnectWallet from './components/ConnectWallet/ConnectWallet';
export const AuthContext = createContext();
const { ethereum } = window;


function App() {
  
  let displayAddr;
  let provider;
  let signer;
  let addr;
  const [connected, setConn] = useState(false);
  const [addr1, setAddr1] = useState(0);
  const [dispAddr, setDispAddr] = useState("")
  const [isUser, setUser] = useState(false);
  const [clwnblnc, setclwnblnc] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [redeemable, setRedeemable] = useState(0)

  const user = useSelector(state => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);


  useEffect(() => {
    connectWalletHandler();
    if(connected) {
      contractCallHandler()
    }
  }, )

  async function connectWalletHandler() {
    if (ethereum) {
        await ethereum.request({method: 'eth_requestAccounts'})
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = await provider.getSigner();
        addr = await signer.getAddress();
        makeDispAddr(addr);
        setAddr1(addr);
        setConn(true);
    }
    else {
        alert("Please install MetaMask to connect your wallet and try again");
    }
  }
  function makeDispAddr(numAddr) {
    const strAddr = numAddr.toString();
    const first = strAddr.slice(0,4);
    const last = strAddr.slice(-4);
    displayAddr = `${first}...${last}`;
    setDispAddr(displayAddr);
  }
  async function contractCallHandler() {
    let contractInstance = await contractCall();
    if (await contractInstance.isRegistered(addr1)) {
      setUser(true)
      let balanceOf = parseInt(await contractInstance.balanceOf(addr1), 16);
      setclwnblnc(balanceOf);
      let currRedeemable = parseInt(await contractInstance.getCurrRedeemable(addr1), 16)
      setRedeemable(currRedeemable);

    } else console.log("Please register")
  }

  if (!loaded) {
    return null;
  }
  
  if( (!user && !connected && !isUser) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar isUser={isUser} user={user}/>
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm />
              </div>
              <div className='web3wrapper'>
              <div className='successdiv'></div>
                <div className='requestdiv'>Please connect to metamask</div>
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if( (!user && connected && !isUser) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar isUser={isUser} user={user}/>
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm />
              </div>
              <div className='web3wrapper'>
                <Web3Login setUser={setUser} setclwnblnc={setclwnblnc}  addr1={addr1} connected={connected} />
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if( (!user && connected && isUser) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar isUser={isUser} user={user}/>
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm />
              </div>
              <div className='web3wrapper'>
                <div className='successdiv'>Wallet is connected and you're registered!</div>
                <div className='requestdiv'>Please login to your left!</div>
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if( (user && !connected && !isUser) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar isUser={isUser} user={user}/>
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <div className='successdiv'>You are now logged in!</div>
                <div className='requestdiv'>Please connect to metamask</div>
              </div>
              <div className='web3wrapper'>
                <div className='successdiv'>You're almost there!</div>
                <div className='requestdiv'>Please connect to metamask</div>
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if( (user && connected && !isUser) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar isUser={isUser} user={user}/>
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <div className='successdiv'>You are now logged in and connected to metamask!</div>
                <div className='requestdiv'>Please register your account</div>
              </div>
              <div className='web3wrapper'>
                <Web3Login setUser={setUser} setclwnblnc={setclwnblnc}  addr1={addr1} connected={connected} />
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if (user && connected && isUser) {
    return (
      <div className='app'>
        <BrowserRouter>
        <Navbar isUser={isUser} user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <Menu redeemable={redeemable} clwnblnc={clwnblnc} dispAddr={dispAddr} addr1={addr1} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <div className='homepagewrapper'>
          {/* <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route> */}
            <ProtectedRoute path='/' exact={true} >
                <Homepage connected={connected} addr1={addr1} setUser={setUser} setConn={setConn} setAddr1={setAddr1} setclwnblnc={setclwnblnc} setDispAddr={setDispAddr} setRedeemable={setRedeemable} clwnblnc={clwnblnc} isUser={isUser} /> 
            </ProtectedRoute>
          {/* </Switch> */}
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
