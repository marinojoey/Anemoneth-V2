import React from "react";
import "./web3Login.scss";
import contractCall from "../ContractCall/ContractCall";

function Web3Login({ setUser, setclwnblnc, addr1, connected }) {

    async function contractCallHandler() {
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered(addr1)) {
            setUser(true)
            let balanceOf = parseInt(await contractInstance.balanceOf(addr1), 16);
            setclwnblnc(balanceOf);
        } else console.log("Please register")
    }

    async function registerCall() {
        let contractInstance = await contractCall();
        await contractInstance.register({ value: 1000000000, gasLimit: 25000000 });
    }

    if (connected) {
        return (
            <div className='web3login'>
                <div className="alreadyregistered">
                    <div id="regged" className="web3logindiv">Already registered?</div>
                    <button className="loginButtons" onClick={contractCallHandler}>Enter the Anemone</button>
                </div>
                <div className="notregistered">
                    <div className="web3logindiv">If not,</div>
                    <button className='loginButtons' onClick={registerCall} >Register Here</button>
                    <div id="details" className="web3logindiv">It will cost 1 Gwei (+ gas) and you will recieve 1 CLWN in return.</div>
                </div>
            </div>
        );
    }
};

export default Web3Login;
