import { ethers } from 'ethers';
import anemonethJSON from "../../utils/anemoneth.json"


const anemonethProxyAddress = "0xf69BEB25fAd2D18141895b056C3c2CcDbaa9E0f4";
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