import { ethers } from 'ethers';
import anemonethJSON from "../../utils/anemoneth.json"


const anemonethProxyAddress = "0x5ceeB384B6224874938c4280A9E545c61BC06984";
const { ethereum } = window;
let contractInstance;
let provider;
let signer;

function contractCall() {

    ethereum.request({ method: 'eth_requestAccounts'});
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contractInstance = new ethers.Contract(anemonethProxyAddress, anemonethJSON.abi, signer);
    return contractInstance;
}

export default contractCall;
