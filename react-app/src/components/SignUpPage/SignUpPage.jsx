import React, { useEffect } from "react";
import "./signUpPage.scss";
import contractCall from "../ContractCall/ContractCall";
import Navbar from "../Navbar/Navbar";
import { ethers } from "ethers";
import { useOutletContext } from "react-router-dom";
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
                    {!MMConnected && <button className="connectWalletBtn" onClick={connectWalletHandler}>Connect Wallet</button>}
                    {MMConnected && <button className="connectWalletBtn" id="done">Wallet Connected!</button>}
                </div>
                <div className="footer"><span className="line"></span> </div>
            </div>
            <div className="step two">
                <div className="s2Top">
                    <div className="h1">Users are frictionlessly rewarded with FISH (our ERC20 token) when they recieve upvotes. Natively making every user a financial stakeholder allows us to re-align incentives back to those users and away from wall street. We are finally able to benefit not just socially, but also financially from the value that our platforms create! </div>
                </div>
                <div className="s2Bottom">
                    <div className="h1 bl">After you sign-up, you dont have to manage a thing! You'll be able to watch your FISH balance grow over time and be able to freely redeem it at any point. </div>
                    <div className="h1 br">If you meet a minimum threshold, you will be placed in one of three earnings tiers based on activity: low, mid or high. <br></br><br></br>Allocations will happen weekly.  </div>
                </div>
                <div className="footer"><span className="line"></span> </div>
            </div>
            <div className="step three">
                <div className="s3left">
                    <div className="registerIntro">
                        Registering is going to do a few great things for you:
                    </div>
                    <ul className="registerExplanation">
                        <li>It will add your wallet address to our smart contract. This will allow you to earn, stake and redeem FISH.</li> 
                        <li>It will mint a unique, non-transferrable NFT to your account which will allow your profile to be easily identifiable</li> 
                        <li>It grants you access to the only platform that pays you for using it!</li>
                    </ul>
                    <div className="okay">If that sounds fair...</div>
                </div>
                <div className="s3right">
                    <div className="registerWarning">
                        But before you hit that button there are a few things you should know:
                    </div>
                    <ul className="points">
                        <li>It will cost 1 Gwei</li>
                        <li>You will be given 1 FISH</li>
                        <li>Our tokenomics will never change</li>
                        <li>The only time you are restricted from withdrawing is the first week after signing up</li>
                    </ul>
                    <div className="buttonWrapper">
                        <button className="registerBtn" onClick={registerCall}>Then register here!</button>
                    </div>
                </div>
                <div className="footer"><span className="line"></span> </div>
            </div>
            <div className="step four">
                <div className="web2Login">
                    <div className="web2LoginDescription">
                        Last step. Please sign-up
                    </div>
                    <SignUpForm className="form"/>
                </div>
                <div className="thanks">
                    <div className="message">
                        Thanks for joining!<br></br> We hope it wasn't too hard. Happy earning!
                    </div>
                    <button className="enterBTN">Enter the Anemone!</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
