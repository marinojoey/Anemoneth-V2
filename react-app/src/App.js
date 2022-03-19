import './app.scss'
import React, { useState, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { authenticate } from './store/session';
import { ethers } from "ethers";

import contractCall from './components/ContractCall/ContractCall';
import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Web3Login from './components/Web3Login/Web3Login'
import Homepage from './components/Homepage/Homepage';
import Menu from './components/Navbar/Menu/Menu';
import Navbar from './components/Navbar/Navbar';

export const AuthContext = createContext();
const { ethereum } = window;


function App() {

  let displayAddr;
  let provider;
  let signer;
  let addr;

  const user = useSelector(state => state.session.user);

  const [dispAddr, setDispAddr] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [connected, setConn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isUser, setUser] = useState(false);
  const [addr1, setAddr1] = useState(0);
  const [clwnblnc, setclwnblnc] = useState(0);
  const [redeemable, setRedeemable] = useState(0);
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
      contractCallHandler();
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
  }
  function makeDispAddr(numAddr) {
    const strAddr = numAddr.toString();
    const first = strAddr.slice(0,4);
    const last = strAddr.slice(-4);
    displayAddr = `${first}...${last}`;
    setDispAddr(displayAddr);
  }
  
  function readable(num) {
    return ethers.utils.formatUnits(parseInt(num).toString(), 18);
  }

  async function contractCallHandler() {
    let contractInstance = await contractCall();
    if (await contractInstance.isRegistered(addr1)) {
      setUser(true);
        let balanceOf = readable(await contractInstance.balanceOf(addr1));
        setclwnblnc(balanceOf);
        try {
        let currRedeemable = readable(await contractInstance.getCurrRedeemable());
        setRedeemable(currRedeemable);
        }
        catch{
          let currRedeemable = 0;
          setRedeemable(currRedeemable);
        }
    }
  }

  if (!loaded) {
    return null;
  }

  if( (!user && !connected && !isUser) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar isUser={isUser} connected={connected} />
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm addr1={addr1} connected={connected} />
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
            <Navbar isUser={isUser} connected={connected} />
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm addr1={addr1} connected={connected} />
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
                <SignUpForm addr1={addr1} connected={connected} />
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
            {/* Test this ^^^^. I am not sure if the navbar props need to be passed if !isUSer */}
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
            <ProtectedRoute path='/' exact={true} >
                <Homepage addr1={addr1} setUser={setUser} setclwnblnc={setclwnblnc} setRedeemable={setRedeemable} />
            </ProtectedRoute>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
