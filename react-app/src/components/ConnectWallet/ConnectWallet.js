// import { ethers } from 'ethers';
// const { ethereum } = window;

// async function ConnectWallet() {

//     if (ethereum) {
//         await ethereum.request({method: 'eth_requestAccounts'})
//         provider = new ethers.providers.Web3Provider(ethereum);
//         signer = await provider.getSigner();
//         addr = await signer.getAddress();
//         makeDispAddr(addr);
//         setAddr1(addr);
//         setConn(true);
//     }
//     else {
//         alert("Please install MetaMask to connect your wallet and try again");
//     }
    
//     function makeDispAddr(numAddr) {
//         const strAddr = numAddr.toString();
//         const first = strAddr.slice(0,4);
//         const last = strAddr.slice(-4);
//         displayAddr = `${first}...${last}`;
//         setDispAddr(displayAddr);
//     }
// }

// export default ConnectWallet