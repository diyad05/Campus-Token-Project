import { useState } from "react";
import { ethers } from "ethers";
import abi from "./CampusTokenABI.json";

function App() {
  //STATE VARIABLES
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenCap, setTokenCap] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [activeSection, setActiveSection] = useState("");
  // ADDRESS OF DEPLOYED CT SMART CONTRACT (ON SEPOLIA)
  const contractAddress = "0x66719957A4124ea2EDbb2634945cDFd693a42443";
  // FUNCTION TO AUTOREFRESH AFTER TRANSACTION
  async function loadBlockchainData(address) {
  const provider = new ethers.BrowserProvider(window.ethereum);

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    provider
  );

  const balance = await contract.balanceOf(address);
  setTokenBalance(ethers.formatEther(balance));

  const supply = await contract.totalSupply();
  setTotalSupply(ethers.formatEther(supply));

  const cap = await contract.cap();
  setTokenCap(ethers.formatEther(cap));
  }
  //TOKEN RELATED FUNCTIONS
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletAddress(accounts[0]);
      await loadBlockchainData(accounts[0]);

    } catch (error) {
      console.error(error);
    }
  }
  async function mintTokens() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

      const tx = await contract.mint(
        mintAddress,
        ethers.parseEther(mintAmount),
        true
      );

      await tx.wait();
      await loadBlockchainData(walletAddress);
      alert("Mint Successful!");
    } catch (error) {
      console.error(error);
      alert("Mint Failed");
    }
  }
  async function burnTokens() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

      const tx = await contract.burn(
        ethers.parseEther(burnAmount)
      );

      await tx.wait();
      await loadBlockchainData(walletAddress);
      alert("Burn Successful!");
    } catch (error) {
      console.error(error);
      alert("Burn Failed");
    }
  }
  async function transferTokens() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

      const tx = await contract.transfer(
        transferAddress,
        ethers.parseEther(transferAmount)
      );

      await tx.wait();
      await loadBlockchainData(walletAddress);
      alert("Transfer Successful!");
    } catch (error) {
      console.error(error);
      alert("Transfer Failed");
    }
  }
   return (
  <div style={{ padding: "20px" }}>
    <h1 style={{ textAlign: "center" }}>
      Campus Token DApp
    </h1>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: "30px",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ width: "50%" }}>
        <button onClick={connectWallet}>
          Connect Wallet
        </button>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Connected Wallet:</strong>
            <br />
            {walletAddress}
          </p>

          <p>
            <strong>Token Balance:</strong>
            <br />
            {tokenBalance}
          </p>

          <p>
            <strong>Total Supply:</strong>
            <br />
            {totalSupply}
          </p>

          <p>
            <strong>Token Cap:</strong>
            <br />
            {tokenCap}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ width: "40%" }}>
        <button
          onClick={() => setActiveSection("mint")}
        >
          Mint Tokens
        </button>

        <br /><br />

        <button
          onClick={() => setActiveSection("burn")}
        >
          Burn Tokens
        </button>

        <br /><br />

        <button
          onClick={() => setActiveSection("transfer")}
        >
          Transfer Tokens
        </button>

        <br /><br />

        {activeSection === "mint" && (
          <div>
            <h3>Mint Tokens</h3>

            <input
              type="text"
              placeholder="Receiver Address"
              value={mintAddress}
              onChange={(e) =>
                setMintAddress(e.target.value)
              }
            />

            <br /><br />

            <input
              type="text"
              placeholder="Amount"
              value={mintAmount}
              onChange={(e) =>
                setMintAmount(e.target.value)
              }
            />

            <br /><br />

            <button onClick={mintTokens}>
              Confirm Mint
            </button>
          </div>
        )}

        {activeSection === "burn" && (
          <div>
            <h3>Burn Tokens</h3>

            <input
              type="text"
              placeholder="Amount"
              value={burnAmount}
              onChange={(e) =>
                setBurnAmount(e.target.value)
              }
            />

            <br /><br />

            <button onClick={burnTokens}>
              Confirm Burn
            </button>
          </div>
        )}

        {activeSection === "transfer" && (
          <div>
            <h3>Transfer Tokens</h3>

            <input
              type="text"
              placeholder="Receiver Address"
              value={transferAddress}
              onChange={(e) =>
                setTransferAddress(e.target.value)
              }
            />

            <br /><br />

            <input
              type="text"
              placeholder="Amount"
              value={transferAmount}
              onChange={(e) =>
                setTransferAmount(e.target.value)
              }
            />

            <br /><br />

            <button onClick={transferTokens}>
              Confirm Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default App;