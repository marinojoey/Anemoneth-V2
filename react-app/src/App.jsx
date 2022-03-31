import './app.scss'
import React, { useState, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { authenticate } from './store/session';
import { ethers } from "ethers";

import contractCall from './components/ContractCall/ContractCall';
import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
// import Web3Login from './components/Web3Login/Web3Login'
import Homepage from './components/Homepage/Homepage';
import Menu from './components/Navbar/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import SplashPage from './components/SplashPage/SplashPage';

export const AuthContext = createContext();
const { ethereum } = window;


function App() {

  const user = useSelector(state => state.session.user);

  // const [provider, setProvider] = useState("");
  // const [signer, setSigner] = useState("");
  // const [w3User, setW3User] = useState(false);
  // const [dispAddr, setDispAddr] = useState("");
  // const [ethAddr, setEthAddr] = useState(0);
  // const [MMConnected, setMMConn] = useState(false);
  // const [DbLoaded, setDbLoaded] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);
  // const [fishblnc, setfishblnc] = useState(0);
  // const [redeemable, setRedeemable] = useState(0);

  const [state, setState] = useState({
    provider: {},
    signer: {},
    w3User: false,
    displayAddr: "",
    ethAddr: 0,
    MMConnected: false,
    DbLoaded: false,
    menuOpen: false,
    fishblnc: 0,
    redeemable: 0,
  });

  const w3User = state?.w3User;

  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setState({
        ...state,
        DbLoaded: true
      });
    })();
  }, [dispatch]);

  function readable(num) {
    return ethers.utils.formatUnits(parseInt(num).toString(), 18);
  }

  // This should await MM being MMConnected and fire automatically after w3User is true. Direct user input for this isn't needed unless it pops up MM to do it
  async function contractCallHandler() {
    let contractInstance = await contractCall();
    if (await contractInstance.isRegistered(state.ethAddr)) {
      setState({ ...state, w3User: true });
        let balanceOf = readable(await contractInstance.balanceOf(state.ethAddr));
        setState({ ...state, fishblnc: balanceOf });
        try {
        let currRedeemable = readable(await contractInstance.getCurrRedeemable());
        setState({ ...state, redeemable: currRedeemable })
        }
        catch{
          let currRedeemable = 0;
          setState({ ...state, redeemable: currRedeemable })
        }
    }
  }

  if (!state.DbLoaded) {
    return null;
  }

  return (
    <div className='app'>
      <Navbar state={state} setState={setState} />
      {(user && w3User) ? <Menu state={state} setState={setState} /> : <span></span>} 
      <Outlet context={[state, setState]}/>
    </div>
  );
}


export default App;