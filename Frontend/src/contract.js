 import { ethers } from "ethers";
import CampusTokenABI from "./CampusTokenABI.json";

export const CONTRACT_ADDRESS = "0x66719957A4124ea2EDbb2634945cDFd693a42443";

// Connect to MetaMask and return provider, signer and contract
export async function getBlockchain() {

    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CampusTokenABI,
        signer
    );

    return {
        provider,
        signer,
        contract,
    };
}

// Mint Tokens
export async function mintTokens(to, amount, includeReward) {

    const { contract } = await getBlockchain();

    const tx = await contract.mint(
        to,
        ethers.parseUnits(amount.toString(), 18),
        includeReward
    );

    await tx.wait();

    return tx;
}
//Burn Tokens
export async function burnTokens(amount) {

    const { contract } = await getBlockchain();

    const tx = await contract.burn(
        ethers.parseUnits(amount.toString(), 18)
    );

    await tx.wait();

    return tx;
}
//Transfer Tokens
export async function transferTokens(to, amount) {

    const { contract } = await getBlockchain();

    const tx = await contract.transfer(
        to,
        ethers.parseUnits(amount.toString(), 18)
    );

    await tx.wait();

    return tx;
}
//Transaction History 
export async function getTransactionHistory() {

    const { contract } = await getBlockchain();

    const filter = contract.filters.Transfer();

    const events = await contract.queryFilter(filter);

    return events;
}