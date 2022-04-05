import './fry.scss'

import React from 'react'
import contractCall from '../../ContractCall/ContractCall';
import { ethers } from "ethers";
import { Link, useOutletContext } from "react-router-dom";
const { ethereum } = window;

function Fry() {

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
    <div className='frypage'>
      <div className='context'>
        <h1>Getting started</h1>
        <div className='step toExpect'>
          <h4 className='subStep title'>What to expect from this guide:</h4>
          <div className='expect description p'>
          We are going to start with a wide view. Pretty quickly though we&#39;ll get into how AnemonETH operates, get you signed up, learn why the heck it uses Ethereum and how it can all benefit you.
          </div>
          <div className='expect descriptionN ps'>
            Disclaimer: If read in good faith, this crash course is honest and accurate. However, it&#39;s certainly possible to poke holes in parts of this guide.
          </div>
        </div>
        <div className='step whatIsBlockchain'>
          <h4 className='subStep title'>What is a blockchain?</h4>
          <div className='blockchain description p'>
            A blockchain solves one problem: how can disparate parties, who don&#39;t know or trust each other, achieve consensus and agree on something? To put it simply a blockchain is just a continually updated database. The two primary blockchains are Bitcoin and Ethereum. They are 2 distinct blockchains that have nothing to do with each other. 
          </div>
          <div className='blockchain descriptionN p'>
            Bitcoin was the first blockchain and the "something" that it provided consensus for were simple account balances. With Bitcoin, Bob doesn&#39;t need to know or trust Alice when she says she has enough bitcoin to pay him. He can verify her ability to pay instantly, for free and with no fee-charging intermediary.
          </div>
        </div>
        <div className='step whatIsEthereum'>
          <h4 className='subStep title'>What is Ethereum?</h4>
          <div className='ethereum description p'>
            Ethereum is another blockchain where the thing everyone can agree on is extended from just account balances to the infinitely useful "state". Here is a quick example of what this means: 
          </div>
          <div className='ethereum descriptionN lTitle'>Bitcoin:</div>
          <li>Alice has 10 bitcoin</li>
          <li>Bob has 3 bitcoin</li>
          <div className='ethereum descriptionN lTitle'>Ethereum:</div>
          <li>
            Alice has:
              <li>8 Ether</li>
              <li>4 lives remaining on Angry Squirrels</li>
              <li>A ticket to Eth Denver</li>
          </li>
          <li>
            Bob has:
            <li>3 Ether</li>
            <li>A registered account on AnemonETH</li>
            <li>Graduated from Chainshot, an Ethereum developer bootcamp</li>
          </li>
          <div className='ethereum descriptionN p'>
            Anemoneth makes use of this flexibility in a few ways. Primarily, we use what is called an "ERC20" token. These are custom tokens that any developer is free to make. ERC20 tokens can be given practically any qualities that their creator wants: they can have vesting periods, provide voting rights, be non-transferrable and so much more. AnemonETH's ERC20 token is called FISH - you'll learn more about it soon. 
          </div>
        </div>
        <div className='step consensus'>
          <h4 className='subStep title'>How does Ethereum achieve Consensus?</h4>
          <div className='consensus description p'>
            Some quick facts about Ethereum:
            <li>Ethereum is an operating system (like Windows)</li>
            <li>"Ether" is Ethereum&#39;s internal unit of account</li>
            <li>A "node" is a small computer running Ethereum, of which thousands exist</li>
            <li>The "Ethereum Virtual Machine" is the shared state of every operational node</li>
            <li>Each node shares the exact same, redundant information</li>
          </div>
          <div className='consensus descriptionN p'>
            You&#39;re about to register on AnemonETH, so let&#39;s use that to explain how Ethereum works. When you click the register button a few simple things happen behind the scenes:
            <li>We pull our &#39;Smart Contract&#39; out from the filing cabinet</li>
            <li>We check that you meet all of our conditions for a new member</li>
            <li>We attempt to add you to our &#39;Smart Contract&#39;</li>
          </div>
          <div className='consensus descriptionN p'>
            What we are attempting to do is to change the &#39;state&#39; of the Ethereum Virtual Machine for you! If successful, every single Ethereum node will pull out our contract, update its state to include your name and then file it away again. It is important to note that all we can do is attempt to add you to our contract. Nobody holds unilateral power over Ethereum: not Vitalik, not any government, and not AnemonETH. As long as you are playing by the rules of AnemonETH&#39;s contract, there is no reason the request would be rejected.
          </div>
        </div>
        <div className='step ether'>
          <h4 className='subStep title'>A note on Ether</h4>
          <div className='ether description p'>
            Ether is the currency of Ethereum and is the thing that has a price. To help distinguish, Ethereum does not have a price and is the platform in which Ether is used. A very rough analogy would be that Ether is to Ethereum what the U.S. dollar is to the USA - it allows you to do business. 
          </div>
          <div className='ether descriptionN p'>
            The Ethereum Virtual Machine (remember the collection of nodes?) can do anything that any other computer can do, provided enough Ether. The catch is that Ethereum is millions of times more expensive than the computer you are using now. Every key-stroke would cost a dollar and saving a photo would cost hundreds of thousands of dollars. There are many reasons for this, but what deserves emphasis is that this is <span className='bolded'>by design</span>. The high cost is a feature, not a bug.
          </div>
          <div className='ether descriptionN p'>
            By making each state-change expensive, developers are incentivized to only use the EVM when they need to. This results in a blockchain that can be stored and operated on a cell phone which in turn means that more people will run nodes and the network will become stronger. 
          </div>
        </div>
      </div>
      <div className='timeToRegister'>
        <h1>Time To Register!</h1>
        <div className='step clarifications'>
          <h4 className='subStep title'>A few important clarifications:</h4>
          <li>This entire process will be completely FREE</li>
          <li>You will not have to enter any personal information, especially not a credit card</li>
          <li>We will be using an Ethereum Test Network, where Ether is free</li>
          <li>Other than the way you get Ether, this process will be identical to the real thing</li>
        </div>
        <div className='step installMetamask'>
          <h4 className='subStep title'>Install Metamask</h4>
          <div className='blockchain description p'>
            Metamask is the Ethereum "Wallet" we will be using. After you install the extension on your browser it will house your ethereum address.
          </div>
          <div className='blockchain descriptionN p'>
            An Ethereum address is a bit like a super secure username for ethereum's blockchain. Whats neat though is that its recognized accross the entire ethereum network and not just on a single website. In a single sentence, you need an address to do anything on the blockchain and a wallet is going to manage that for you!
          </div>
          <div className='blockchain descriptionN p'>
            <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask.io</a>
          </div>
        </div>
        <div className='step connectMetamask'>
          <h4 className='subStep title'>Connect Metamask</h4>
          <div className='blockchain description p'>
            At this point you've made a wallet and that wallet has an address, congrats! This
          </div>
          <div className='blockchain descriptionN p'>
            What we need to do now is allow Metamask to communicate with AnemonETH. The connect button below will do that for us. Rest assured, your wallet is still exclusively under your control. Hitting that button is going to allow AnemonETH to ask Metamask to ask you if something is ok. Kinda weird, right?
          </div>
          {MMConnected ? <button className="connectWalletBtn" id="done">Wallet Connected!</button> :
          <button className="connectWalletBtn" onClick={connectWalletHandler}>Connect Wallet</button> }
        </div>
        <div className='step faucet'>
          <h4 className='subStep title'>Who doesn't want free money?</h4>
          <div className='faucet description p'>
            AnemonETH is still being actively developed, for this reason it is currently deployed on whats called a test-network. There are a few different test-nets but the one AnemonETH uses is called "Rinkeby". 
          </div>
          <div className='faucet descriptionN p'>
            Test-nets are really cool. In order to speed up the development process, test-net Ether is freely given away! Go grab some <span className='bold'>Rinkeby</span> Test-Net Ether at any of the following sites:
          </div>
          <li><a href="https://rinkebyfaucet.com/" target="_blank" rel="noopener noreferrer">Alchemy.com</a></li>
          <li><a href="https://faucets.chain.link/rinkeby" target="_blank" rel="noopener noreferrer">Chain.link</a>&nbsp;&nbsp;&nbsp; (Connect your wallet to this website)</li>
          <li><a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">faucet.rinkeby.io</a>&nbsp;&nbsp;&nbsp;(You'll need a twitter account for this one)</li>
          <li><a href="https://www.google.com/search?q=rinkeby+faucet&client=firefox-b-1-d&sxsrf=APq-WBteetEA1eBwpsH_G2AlqXYPVexowQ%3A1649197539073&ei=48FMYt7_A8K1qtsPp_-K8Ak&ved=0ahUKEwie_evL-_32AhXCmmoFHae_Ap4Q4dUDCA0&uact=5&oq=rinkeby+faucet&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBQgAEJECMgUIABCRAjIFCAAQkQIyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQsAMQJzoHCAAQRxCwA0oECEEYAEoECEYYAFDeBFjECGC1C2gBcAF4AIABSYgBjAGSAQEymAEAoAEByAEJwAEB&sclient=gws-wiz" target="_blank" rel="noopener noreferrer">Google search</a></li>
        </div>
      </div>
    </div>
  )
}

export default Fry