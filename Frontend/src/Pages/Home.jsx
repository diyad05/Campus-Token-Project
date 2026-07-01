import { useState } from "react";
import { ethers } from "ethers";
import { getBlockchain } from "../contract";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import WalletCard from "../Components/WalletCard";
import MainPanel from "../Components/MainPanel";

import "../styles/Home.css";

function Home() {

  // Wallet connection state
  const [walletConnected, setWalletConnected] = useState(false);

  const [activePage, setActivePage] = useState("default");

  const [walletAddress, setWalletAddress] = useState("");

  const [tokenBalance, setTokenBalance] = useState("0");

  const [network, setNetwork] = useState("");

  const [isOwner, setIsOwner] = useState(false);

  // Connecting to MetaMask
  const connectWallet = async () => {

    try {

      const { signer, provider, contract } = await getBlockchain();

      const address = await signer.getAddress();
      const net = await provider.getNetwork();

      setNetwork(net.name);
      const balance = await contract.balanceOf(address);

      setTokenBalance(
        ethers.formatUnits(balance, 18)
      );
      const owner = await contract.owner();

      setIsOwner(
        owner.toLowerCase() === address.toLowerCase()
      );

      setWalletAddress(address);

      setWalletConnected(true);

    } catch (err) {

      alert(err.message);

    }

  };

  return (
    <div className="home">

      <Navbar />

      <div className="dashboard">

        <Sidebar
          connectWallet={connectWallet}
          walletConnected={walletConnected}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <div className="content">

          <WalletCard
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            tokenBalance={tokenBalance}
            network={network}
            isOwner={isOwner}
          />

          <MainPanel
            activePage={activePage}
            isOwner={isOwner}
          />

        </div>

      </div>

    </div>
  );
}

export default Home;