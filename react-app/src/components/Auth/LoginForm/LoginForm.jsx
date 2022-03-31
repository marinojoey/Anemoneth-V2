import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import { Navigate, useOutletContext } from 'react-router-dom';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractCall from '../../ContractCall/ContractCall';
import './loginForm.scss'
const { ethereum } = window;
 
const LoginForm = () => {

  const [state, setState] = useOutletContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [    errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const MMConnected = state?.MMConnected;
  const w3User = state?.w3User;
  const ethAddr = state?.ethAddr;
  const w2User = useSelector(state => state.session.user);

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

  async function connectWalletHandler() {
    if (ethereum) {
        await ethereum.request({method: 'eth_requestAccounts'})
        const prov = new ethers.providers.Web3Provider(ethereum);
        setTimeout( async () => {
          setState(prevState => ({
            ...prevState,
            provider: prov
          }));
          const signr = await prov.getSigner();
          setState(prevState => ({
            ...prevState,
            signer: signr
          }));
          const addr = await signr.getAddress();
          setState(prevState => ({
            ...prevState,
            ethAddr: addr
          }));
          setState(prevState => ({
            ...prevState,
            MMConnected: true
          }));
          makeDispAddr(addr);
        }, 1300)
    }
  }

  function makeDispAddr(numAddr) {
      const strAddr = numAddr.toString();
      const first = strAddr.slice(0,4);
      const last = strAddr.slice(-4);
      const dispAddr = `${first}...${last}`;
      setState(prevState => ({
        ...prevState,
        displayAddr: dispAddr
      }));
  }

  async function loginBtn() {
    if (ethereum) {
      await ethereum.request({method: 'eth_requestAccounts'})
      const prov = new ethers.providers.Web3Provider(ethereum);
      setState(prevState => ({
        ...prevState,
        provider: prov
      }));
      const signr = await prov.getSigner();
      setState(prevState => ({
        ...prevState,
        signer: signr
      }));
      const addr = await signr.getAddress();
      setState(prevState => ({
        ...prevState,
        ethAddr: addr
      }));
      setState(prevState => ({
        ...prevState,
        MMConnected: true
      }));
      makeDispAddr(addr);
      let contractInstance = await contractCall();
      if (await contractInstance.isRegistered(ethAddr)) {
        setState(prevState => ({
            ...prevState,
            w3User: true
        }))
        let balanceOf = parseInt(await contractInstance.balanceOf(ethAddr), 16);
        setState(prevState => ({
            ...prevState,
            fishblnc: balanceOf
        }))
    }
        
  }
    console.log("web3User", w3User)
    console.log("MMConnected", MMConnected)
    console.log("w2User", w2User)
  }


  if (w2User && w3User && MMConnected) {
    return <Navigate to='/homepage' />;
  }

  return (
      <div className='formWrapper'>
        <form onSubmit={onLogin}className="loginwrapper" >
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='usernamewrapper'>
            <label htmlFor='username'>Username&nbsp;&nbsp;</label>
            <input
              name='username'
              type='text'
              placeholder='  Username'
              value={username}
              onChange={updateUsername}
              style={{border: 'none', borderRadius: '5px'}}
            />
          </div>
          <div className='passwordwrapper'>
            <label htmlFor='password'>Password&nbsp;&nbsp;</label>
            <input
              name='password'
              type='password'
              placeholder='  Password'
              value={password}
              onChange={updatePassword}
              style={{border: 'none', borderRadius: '5px'}}
            />
          </div>
          <button type='submit' className='web2btn' onClick={loginBtn}>Login</button>
        </form>
        <button className='connectBtn' onClick={connectWalletHandler}>Is Metamask Connected?</button>
      </div>
  );
};

export default LoginForm;
