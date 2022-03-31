import React, { useEffect } from "react";
import "./signUpPage.scss";
import contractCall from "../ContractCall/ContractCall";
import Navbar from "../Navbar/Navbar";
import { ethers } from "ethers";
import { Link, useOutletContext } from "react-router-dom";
import SignUpForm from "../Auth/SignUpForm/SignUpForm";
const { ethereum } = window;


function SignUpPage() {

    const [state, setState] = useOutletContext();

    const MMConnected = state?.MMConnected;
    const w3User = state?.w3User;
    const ethAddr = state?.ethAddr;

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

    // function consoleLog() {
    //     console.log("MMConnected?", MMConnected)
    //     console.log("w3User?", w3User)
    //     console.log("Eth Addr", ethAddr)
    // }

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

    function readable(num) {
        return ethers.utils.formatUnits(parseInt(num).toString(), 18);
    }
    async function contractCallHandler() {
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
        } else {
            document.querySelector(".enterErrPlaceholder").textContent = "Something went wrong. Please make sure you're registered below!"
        }
    }

    async function registerCall() {
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered(ethAddr)) {
            document.querySelector(".regiErrPlaceholder").textContent = "You are already registered!"
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
        await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
    }


    return (
        <div className='SignUpPage'>
            <div className="step one">
                <div className="s1left">
                    <div className="h1">What is AnemonETH?</div>
                    <div className="description">We are a web3 social platform that directly rewards its users whenever they create great things</div>
                </div>
                <div className="s1right">
                    {MMConnected ? <button className="connectWalletBtn" id="done">Wallet Connected!</button> :
                    <button className="connectWalletBtn" onClick={connectWalletHandler}>Connect Wallet</button> }
                </div>
                <div className="footer"><span className="line"></span> </div>
            </div>
            <div className="step two">
                <div className="s2Top">
                    <div className="h1">Users are natively rewarded with FISH (our ERC20 token) when they recieve upvotes. In other words, every user is a financial stakeholder. This allows us to re-align incentives back to the users and away from wall street. <br></br><br></br>We are now able to benefit not just socially, but also financially from the value that our platforms create! </div>
                </div>
                <div className="s2Bottom">
                    <div className="h1 bl">If you meet a minimum threshold, you will be placed in one of three earnings tiers based on activity: low, mid or high. <br></br><br></br>Allocations will happen weekly and you decide when to redeem.  </div>
                    <div className="h1 br">After you sign-up, you dont have to manage a thing! You will be able to watch your FISH balance grow over time and be able to freely redeem it at any point. </div>
                </div>
                <div className="footer"><span className="line"></span> </div>
            </div>
            <div className="step three">
                <div className="footer"></div>
                <div className="s3left">
                    <div className="liTitle">
                        Registering will do great things for you:
                    </div>
                    <ul>
                        <li>Your address will be added to our smart contract </li>
                        <li>This will then be able to earn, stake and redeem FISH</li>
                        <li>You will mint yourself a unique, non-transferrable NFT</li>
                        <li>This will be used to make your profile uniquely identifiable</li>
                        <li>You will gain access to the only platform that pays you for using it!</li>
                    </ul>
                </div>
                <div className="s3right">
                    <div className="liTitle">
                        First, a few things you should know:
                    </div>
                    <ul>
                        <li>Our tokenomics will never change</li>
                        <li>Registration will cost 1 Gwei (prevents spam)</li>
                        <li>You will be allocated 1 FISH in return</li>
                        <li>Clownfish are born without gender</li>
                        <li>In a process called sequentail hermaphroditism An anemone's dominant clownfish will morph into a female!</li>
                    </ul>
                </div>
                <div className="footer"></div>
            </div>
            <div className="step four">
                <div className="s4top">
                    <div className="okay">If that sounds fair...</div>
                </div>
                <div className="s4bottom">
                    <div className="buttonWrapper">
                        <button className="registerBtn" onClick={registerCall}>Register here!</button>
                    </div>
                </div>
            </div>
            <div className="step five">
                <div className="web2Login">
                    <div className="loginwrapper">
                        <div className="web2LoginDescription">
                            Last step, Please sign-up
                        </div>
                        <SignUpForm className="form"/>
                    </div>
                </div>
            </div>
            <div className="step six">
                <div className="messagewrapper">
                    <div className="message">
                        Thanks for joining!<br></br> We hope it wasn't too hard. <br></br>Happy earning!
                    </div>
                </div>
                <div className="enterwrapper">
                    <Link to="/homepage" className="enterBTN">Enter the Anemone!</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
