import './fry.scss'

import React from 'react'
import contractCall from '../../ContractCall/ContractCall';
import { ethers } from "ethers";
import { Link, useOutletContext } from "react-router-dom";
import graph from "../../Images/graph.png"
import SignUpForm from '../../Auth/SignUpForm/SignUpForm';
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

  // function readable(num) {
  //     return ethers.utils.formatUnits(parseInt(num).toString(), 18);
  // }
  // async function contractCallHandler() {
  //     let contractInstance = await contractCall();
  //     if (await contractInstance.isRegistered(ethAddr)) {
  //         setState(prevState => ({
  //             ...prevState,
  //             w3User: true
  //         }))
  //         let balanceOf = parseInt(await contractInstance.balanceOf(ethAddr), 16);
  //         setState(prevState => ({
  //             ...prevState,
  //             fishblnc: balanceOf
  //         }))
  //     } else {
  //         document.querySelector(".enterErrPlaceholder").textContent = "Something went wrong. Please make sure you're registered below!"
  //     }
  // }

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
        <h1>Intro to AnemonETH</h1>
        <div className='step toExpect'>
          <h4 className='subStep title'>What to expect from this guide:</h4>
          <div className='toExpect description p'>
          We are going to start with a wide view. Pretty quickly though we&#39;ll get into how AnemonETH operates, get you signed up, learn why the heck it uses Ethereum and how it can all benefit you.
          </div>
          <div className='toExpect descriptionN ps'>
            Disclaimer: If read in good faith, this crash course is honest and accurate. However, a consequence of it&#39;s brevity is that it&#39;s possible to poke holes in parts of this guide.
          </div>
        </div>
        <div className='step whatIsBlockchain'>
          <h4 className='subStep title'>What is a blockchain?</h4>
          <div className='blockchain description p'>
            A blockchain solves one problem: how can disparate parties, who don&#39;t know or trust each other, achieve consensus and agree on something? Stripped down, a blockchain is no more than a regularly-updated database. The two primary blockchains are Bitcoin and Ethereum. They are 2 distinct blockchains that have nothing to do with each other. 
          </div>
          <div className='blockchain descriptionN p'>
            While AnemonETH uses Ethereum (for reasons you'll soon learn!), it would be sacrilege to begin this story without a mention of Bitcoin and its creator Satoshi Nakamoto. Bitcoin was the first crypto asset and boasts a few rare qualities. In an attempt to keep things objective, and because those things aren't relevant to this article, I'll leave it at that and just encourage you to explore bitcoin on your own and form your own opinions. 
          </div>
          <div className='blockchain descriptionN p'>
            Right now the thing you need to know about Bitcoin is that it only provided consensus for account balances. With Bitcoin, Bob doesn&#39;t need to know or trust Alice when she says she has enough bitcoin to pay him. He can verify her ability to pay instantly, for free and with no fee-charging intermediary.
          </div>
        </div>
        <div className='step whatIsEthereum'>
          <h4 className='subStep title'>What is Ethereum?</h4>
          <div className='ethereum description p'>
            Ethereum is another blockchain where consensus is extended from just account balances to the infinitely useful "state". Here is a quick example of what this means: 
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
            The key difference is that consensus is extended from simple account balances to anything the user wants. This means that if you are holding a high-stakes tournament, everything can be kept on Ethereum: entry fees, prize pool, participants, each rounds winners and losers, prize distributions, rules etc...
          </div>
          <div className='ethereum descriptionN p'>
            Anemoneth makes use of this flexibility in a few ways. Primarily, we use what is called an "ERC20" token. These are custom tokens that any developer is free to create. ERC20 tokens can be given practically any qualities that their creator wants: they can have vesting periods, provide voting rights, be non-transferrable and much more. AnemonETH's ERC20 token is called FISH - you'll learn more about it soon. 
          </div>
        </div>
        <div className='step consensus'>
          <h4 className='subStep title'>How does Ethereum do this?</h4>
          <div className='consensus description p'>
            Some quick facts about Ethereum:
            <li>Ethereum is an operating system (like Windows)</li>
            <li>"Ether" is Ethereum&#39;s internal unit of account</li>
            <li>A "node" is a small computer running Ethereum, of which thousands exist</li>
            <li>The "Ethereum Virtual Machine" is the shared state of every node</li>
            <li>Each node shares the exact same, redundant information</li>
          </div>
          <div className='consensus descriptionN p'>
            You&#39;re about to register on AnemonETH, so let&#39;s use that to explain how Ethereum works. When you click the register button a few simple things happen behind the scenes:
            <li>We pull our &#39;Smart Contract&#39; out from the filing cabinet</li>
            <li>We check that you meet all of our conditions for a new member</li>
            <li>We attempt to add you to our &#39;Smart Contract&#39;</li>
          </div>
          <div className='consensus descriptionN p'>
            What we are attempting to do is to change the &#39;state&#39; of the Ethereum Virtual Machine for you! If successful, every single Ethereum node will pull out our contract, update it to include your name and then file it away again.
          </div>
          <div className='consensus descriptionN ps'>
            AnemonETH can only attempt this for you. Nobody holds unilateral power over Ethereum: not Vitalik, not any government, and certainly not AnemonETH. However, as long as you are playing by the rules of AnemonETH&#39;s contract, there is no reason the request would be rejected.
          </div>
        </div>
        <div className='step ether'>
          <h4 className='subStep title'>A note on Ether</h4>
          <div className='ether description p'>
            Ether is the currency of Ethereum and is the thing that has a price. To help distinguish, Ethereum does not have a price and is the platform in which Ether is used. A very rough analogy would be that Ether is to Ethereum what the U.S. dollar is to the USA - it allows you to do business. 
          </div>
          <div className='ether description ps'>
            While people certainly speculate on Ether and use it as an investment, that is not why it exists. Ether is necessary because it regulates Ethereum's internal economy. Without Ether, Ethereum would be open to abuse and would grow infinitely large. Ultimately, when people want to use Ethereum they need to have Ether. So, as Ethereum's utility gains recognition, more and more investors use it as a tool for speculation.
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
        <h1>Enough already, Lets Do This!</h1>
        <div className='step clarifications'>
          <h4 className='subStep title'>Okay, but first a few important clarifications:</h4>
          <li>This entire process will be completely FREE</li>
          <li>You will not have to enter any personal information, especially not a credit card</li>
          <li>We will be using an Ethereum Test Network, where Ether is free</li>
          <li>Other than the way you get Ether, this process will be identical to the real thing</li>
        </div>
        <div className='step installMetamask'>
          <h4 className='subStep title'>Install Metamask</h4>
          <div className='blockchain description p'>
            Metamask is the Ethereum "Wallet" we will be using. The link below will take you to their website. After you install the extension on your browser metamask will walk through their sign up process. It won't take long and at the end of it you'll have a wallet with an Ethereum address that can be used on any web3 website!
          </div>
          <div className='blockchain descriptionN p'>
            An Ethereum address is a bit like a super secure username for ethereum's blockchain. Whats neat is that its recognized accross the entire ethereum network instead of a single website. 
          </div>
          <div className='blockchain descriptionN p'>
            To summarize, you need an address to do anything on the blockchain and <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a> is going to make that easy for you!
          </div>
        </div>
        <div className='step connectMetamask'>
          <h4 className='subStep title'>Connect Metamask</h4>
          <div className='blockchain description p'>
            At this point you've made a wallet and that wallet has an address, congrats!
          </div>
          <div className='blockchain descriptionN p'>
            What we need to do now is allow Metamask to communicate with AnemonETH. The connect button below will do that for us. Rest assured, your wallet is still exclusively under your control. Hitting that button is going to allow AnemonETH to ask Metamask to ask you if you want to do something. Kinda weird, right?
          </div>
          {MMConnected ? <button className="connectWalletBtn" id="done">Wallet Connected!</button> :
          <button className="connectWalletBtn" onClick={connectWalletHandler}>Connect Wallet</button> }
        </div>
        <div className='step faucet'>
          <h4 className='subStep title'>Free money?</h4>
          <div className='faucet description p'>
            AnemonETH is still being actively developed, consequently it is currently deployed on whats called a test-network. There are a few different test-nets but the one AnemonETH uses is called "Rinkeby". 
          </div>
          <div className='faucet descriptionN p'>
            Test-nets are really cool. In order to speed up the development process, test-net Ether is freely given away! Go grab some <span className='bold'>Rinkeby</span> Test-Net Ether at any of the following sites:
          </div>
          <li><a href="https://rinkebyfaucet.com/" target="_blank" rel="noopener noreferrer">Alchemy.com</a></li>
          <li><a href="https://faucets.chain.link/rinkeby" target="_blank" rel="noopener noreferrer">Chain.link</a>&nbsp;&nbsp;&nbsp; (Connect your wallet to this website)</li>
          <li><a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">faucet.rinkeby.io</a>&nbsp;&nbsp;&nbsp;(You'll need a twitter account for this one)</li>
          <li><a 
              href="https://www.google.com/search?q=rinkeby+faucet&client=firefox-b-1-d&sxsrf=APq-WBteetEA1eBwpsH_G2AlqXYPVexowQ%3A1649197539073&ei=48FMYt7_A8K1qtsPp_-K8Ak&ved=0ahUKEwie_evL-_32AhXCmmoFHae_Ap4Q4dUDCA0&uact=5&oq=rinkeby+faucet&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBQgAEJECMgUIABCRAjIFCAAQkQIyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQsAMQJzoHCAAQRxCwA0oECEEYAEoECEYYAFDeBFjECGC1C2gBcAF4AIABSYgBjAGSAQEymAEAoAEByAEJwAEB&sclient=gws-wiz" target="_blank" rel="noopener noreferrer">Google search
            </a></li>
          <div className='faucet descriptionN p'>
            The last thing we need to do is configure Metamask so it talks to the Rinkeby test-net instead of main-net Ethereum. After opening Metamask (top right of your browser) open the dropdown menu at the top and choose Rinkeby.
          </div>
        </div>
        <div className='step anemonethInfo'>
          <h4 className='subStep title'>What is AnemonETH</h4>
          <div className='anemonethInfo description p'>
            Our mission is to create a social platform that re-aligns incentives back to the users and away from wall street. To do this, we natively and frictionlessly make each user a financial stakeholder. With AnemonETH, users are able to benefit not just socially, but also financially from the value that their platforms create!
          </div>
          <div className='anemonethInfo descriptionN p'>
            We encourage you to use AnemonETH just as you would any other social platform. The really cool thing though, is that whenever you create some great content or go viral, you not only get the likes and followers, but you're directly rewarded with FISH. You are then free to redeem your FISH and sell it on an exchange like <a href="https://uniswap.org/" target="_blank" rel="noopener noreferrer">Uniswap</a>.
          </div>
          <div className='anemonethInfo descriptionN p'>
            Our reward mechanism is directly correlated with how many upvotes you recieve. Building it this way creates a healthy feedback loop where the members of the community are the one's dictating how value is given instead of advertisers. 
          </div>
          <div className='anemonethInfo descriptionN ps'>
            If you meet a minimum upvote threshold, you will be placed in one of three earnings tiers: low, mid or high. Allocations will happen weekly and then you can decide when to redeem. After you sign-up, you don't have to manage a thing! If you choose to stake, you can passively watch your FISH grow over time.
          </div>
          <div className='anemonethInfo descriptionN p'>
            Lastly, lets take a moment to explain how AnemonETH's staking works. When you earn FISH they are not automatically put into your wallet. Rather, they are kept in a basket on our smart contract that only you can access (not even AnemonETH can touch it!). You are free to redeem your FISH whenever you want, but the longer you wait to redeem, the more FISH you will get.
          </div>
          <div className='anemonethInfo descriptionN p'>
            <img src={graph} alt="graph"></img>
          </div>
          <Link to="/data" className="moreData">More information can be found here</Link>
        </div>
        <div className='step registrationInfo'>
          <h4 className='subStep title'>What does it mean to Register with AnemonETH?</h4>
          <div className='registration description p'>
            Registering with AnemonETH will add your Ethereum address to our smart contract. In case that doesn't mean anything to you, lets dig a bit deeper.
          </div>
          <div className='registrationInfo descriptionN p'>
            By now you understand what AnemonETH is and how it works. You understand that you're rewarded with our token based on how many upvotes you recieve and that you can choose to redeem or stake. Registering on our smart contract is what allows access to all of those things. 
          </div>
          <div className='registrationInfo descriptionN p'>
            Adding your address to AnemonETH's smart contract is like joining a country club, only better. You do both because you understand the rules, agree with them and want to benefit from what they have to offer. You also understand that everyone is held to those same rules and can only act within them. Where a smart contract proves itself superior is the ease in which it operates and it's radical transparency.
          </div>
          <div className='registrationInfo descriptionN p'>
            Smart Contracts are born with zero ability, permissions or use. Everything that you want your smart contract to do or control needs to be explicity defined. With that in mind it would help to take the country club example a little further. Physicaly speaking, you can do anything at a country club that you can do anywhere else. You are physically capable of bringing your bed to the tennis courts and sleeping there every night. The fellow members won&#39;t like that though, so they will define operating hours in the contract and do their best to enforce it. However, what they are unable to do is remove the country club from the fabric of reality while it&#39;s closed. 
          </div>
          <div className='registrationInfo descriptionN ps'>
            At AnemonETH we are also unable to remove country clubs from the fabric of reality. We're working on it though. We can make that happen in cyberspace though!
          </div>
          <div className='registrationInfo descriptionN p'>
            We could have made our contract completely innaccessible on Saturdays if we wanted to. It would have no backdoor and everyone would be aware before registering. Why are we able to do this? Because our contract came before the platform! Everything else was built around it. This is very much unlike the country club.
          </div>
          <div className='registrationInfo descriptionN p a'>
            Before you hit the button below there are a few more things you should know:
          </div>
            {/* <li>You will mint yourself a unique, non-transferrable NFT</li>
            <li>This NFT will be used to make your profile uniquely identifiable</li> */}
            <li>Registration will cost one-billionth of an Ethereum (prevents spam) </li>
            <li>In return you'll be given your first FISH!</li>
            <li>If you earn FISH in a given week, you will earn an additional FISH for every week you hold </li>
            <li>Special earning weeks will happen periodically.</li>
            <li>Redeeming during these weeks will earn you either 1, 5 or 6 extra FISH</li>
            <div className='registrationInfo descriptionN p green'>
              If that sounds fair... 
          </div>
          {w3User ? <button className="registerBtn" id="done">Registered!</button> :
          <button className="registerBtn" onClick={registerCall}>Register here!</button>}
        </div>
        <div className='step web2Signup'>
          <h4 className='subStep title'>This part will be easy</h4>
          <div className='web2Signup description p'>
            Go ahead and sign-up for anemonETH the good ole' fashioned way
          </div>
          <div className='web2Signup descriptionN p'>
            <SignUpForm className="form"/>
          </div>
        </div>
        <div className='step web3'>
          <h4 className='subStep title'>I still don't know what web3 is!</h4>
          <div className='web3 description p'>
            Don't be so sure of that! If you've made it this far you probably do. Web3 doesn't have any strict definition, but it&#39;s generally thought of as any online experience where the user is in control and/or shares value with the creators. Anemoneth is one example. 
          </div>
          <div className='web3 descriptionN ps'>
            Web1 was the 1990's. Developers made website that were read only. It was a good time.
          </div>
          <div className='web3 descriptionN ps'>
            Web2 was the 2000's. Websites became interactive - you could share your photos. It was a good time, too. But it was a really good for the owners of those platforms.
          </div>
          <div className='web3 descriptionN ps'>
            Web3 is now. Thanks to a digitally native economy, websites are being made that can directly provide ownership and control back to the people who are using them. 
          </div>
          <div className='web3 descriptionN p'>
            Web3 is not a silver bullet that will solve every problem that the internet has, but it is improving things. 
          </div>
        </div>
        <div className='step enter'>
          <h4 className='subStep title'>A word of thanks</h4>
          <div className='web2Signup description p'>
            If you're here this early in AnemonETH's development its almost certainly because I personally know you and asked you to check it out. I <span className='bolded'>really</span> appreciate you taking the time.
          </div>
          <div className='web2Signup descriptionN p'>
            For the past month I haven't really done much outside of making this. I am really excited by the things a distributed internet has to offer and want to share that with as many people as I can. This page specifically (but also AnemonETH as whole) was made with that in mind. Hopefully it provided you with a tangible and easily approachable idea of what web3 is.
          </div>
          <div className='web2Signup descriptionN p right'>
            - Joey 
          </div>
          <div className="enterwrapper">
              <Link to="/homepage" className="enterBTN">Enter the Anemone!</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fry