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

  const w2User = useSelector(state => state.session.w2User);

  const [dispAddr, setDispAddr] = useState("");
  const [ethAddr, setAddr1] = useState(0);
  const [w3User, setUser] = useState(false);
  const [connected, setConn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fishblnc, setfishblnc] = useState(0);
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
    if (await contractInstance.isRegistered(ethAddr)) {
      setUser(true);
        let balanceOf = readable(await contractInstance.balanceOf(ethAddr));
        setfishblnc(balanceOf);
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

  if( (!w2User && !connected && !w3User) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar w3User={w3User} connected={connected} />
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm ethAddr={ethAddr} connected={connected} />
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
  else if( (!w2User && connected && !w3User) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar w3User={w3User} connected={connected} />
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm ethAddr={ethAddr} connected={connected} />
              </div>
              <div className='web3wrapper'>
                <Web3Login setUser={setUser} setfishblnc={setfishblnc}  ethAddr={ethAddr} connected={connected} />
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if( (!w2User && connected && w3User) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar w3User={w3User} w2User={w2User}/>
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <LoginForm />
                <SignUpForm ethAddr={ethAddr} connected={connected} />
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
  else if( (w2User && !connected && !w3User) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar w3User={w3User} w2User={w2User}/>
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
  else if( (w2User && connected && !w3User) ) {
    return (
        <div className='app'>
          <BrowserRouter>
            <Navbar w3User={w3User} w2User={w2User}/>
            {/* Test this ^^^^. I am not sure if the navbar props need to be passed if !w3User */}
            <div className='loginComboBox'>
              <div className='web2wrapper'>
                <div className='successdiv'>You are now logged in and connected to metamask!</div>
                <div className='requestdiv'>Please register your account</div>
              </div>
              <div className='web3wrapper'>
                <Web3Login setUser={setUser} setfishblnc={setfishblnc}  ethAddr={ethAddr} connected={connected} />
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
  }
  else if (w2User && connected && w3User) {
    return (
      <div className='app'>
        <BrowserRouter>
          <Navbar w3User={w3User} w2User={w2User} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <Menu redeemable={redeemable} fishblnc={fishblnc} dispAddr={dispAddr} ethAddr={ethAddr} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <div className='homepagewrapper'>
              <ProtectedRoute path='/' exact={true} >
                  <Homepage ethAddr={ethAddr} setUser={setUser} setfishblnc={setfishblnc} setRedeemable={setRedeemable} />
              </ProtectedRoute>
          </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
