import './fry.scss'

import React from 'react'

function Fry() {
  return (
    <div className='frypage'>
      <h1>Getting started</h1>
      <div className='step toExpect'>
        <h4 className='subStep title'>What to expect from this guide:</h4>
        <div className='expect description p'>
        We are going to start with a wide view. Pretty quickly though we&#39;ll get into how AnemonETH operates, get you signed up, learn why the heck it uses Ethereum and how it can all benefit you.
        </div>
        <div className='expect descriptionN ps'>
          Disclaimer: It&#39;s possible to poke holes in nearly every sentence of this guide. That&#39;s part of the deal when you condense something down this far while making it easily understandable. However, if read in good faith, it&#39;s honest and accurate. </div>
      </div>
      <div className='step whatIsBlockchain'>
        <h4 className='subStep title'>What is a blockchain?</h4>
        <div className='blockchain description p'>
          A blockchain solves one problem: how can disparate parties, who don&#39;t know or trust each other, agree on something i.e. how do we attain consensus? The two primary blockchains are Bitcoin and Ethereum. They are 2 distinct blockchains that have nothing to do with each other. 
        </div>
        <div className='blockchain descriptionN p'>
          Bitcoin was the first blockchain and the "something" that it provided consensus for were simple account balances. With Bitcoin, Bob doesn&#39;t need to know or trust Alice when she says she has enough bitcoin to pay him. He can verify her ability to pay instantly, for free and with no fee-charging intermediary.
        </div>
      </div>
      <div className='step whatIsEthereum'>
        <h4 className='subStep title'>What is Ethereum?</h4>
        <div className='ethereum description p'>
          Ethereum is a blockchain where the thing everyone can agree on is extended from account balances to the infinitely useful "state". Here is a quick example of what this means: 
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
          <li>Is registered on AnemonETH</li>
          <li>Graduated from Chainshot, an Ethereum developer bootcamp</li>
        </li>
        <div className='ethereum descriptionN p'>
          Anemoneth makes use of this flexibility in a few ways. Primarily, we use whats called an "ERC20" token. These are custom tokens that anyone is free to make. ERC20 tokens can be given practically any qualities that their creator wants: they can have vesting periods, provide voting rights, be non-transferrable and so much more. AnemonETH's ERC20 token is called FISH. 
        </div>
      </div>
      <div className='step consensus'>
        <h4 className='subStep title'>How does Ethereum achieve Consensus?</h4>
        <div className='consensus description p'>
          Some quick facts about Ethereum:
          <li>Ethereum is an operating system (like windows)</li>
          <li>"Ether" is Ethereum&#39;s internal unit of account</li>
          <li>A "node" is a small computer running Ethereum</li>
          <li>There are thousands of nodes</li>
          <li>The "Ethereum Virtual Machine" is the collection of every operational node</li>
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
          Ether is the currency of Ethereum and is the thing that has the price. To help distinguish, Ethereum does not have a price and is the substrate in which Ether is used. A very rough analogy would be that Ether is to Ethereum what the U.S. dollar is to the USA. It is what allows you to do business. While people do buy and hold Ethereum speculatively, that is not why it exists. Ether exists as a way to regulate Ethereum&#39;s "changing of state". 
        </div>
        <div className='ether descriptionN p'>
          The Ethereum Virtual Machine can do anything that any other computer can do, provided enough Ether. The catch is that Ethereum is millions of times more expensive than the computer you are using now. Every key-stroke would cost a dollar and saving a photo would cost hundreds of thousands of dollars. There are many reasons for this, but what deserves emphasis is that this is <span className='bolded'>by design</span>, it is a feature, not a bug.
        </div>
        <div className='ether descriptionN p'>
          By making each state-change expensive, developers are incentivized to only use the EVM when they need to. This results in a blockchain that can be stored and operated on a cell phone which in turn means that more people will run nodes and the network will become stronger. 
        </div>
      </div>
    </div>
  )
}

export default Fry