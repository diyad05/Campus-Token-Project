														 CAMPUS TOKEN PROJECT

Overview-

Campus Token Project is an ERC-20 token built using Solidity and deployed on the Ethereum Sepolia Testnet. Along with the smart contract, I developed a React frontend integrated with MetaMask, allowing users to interact with the token directly through their browser.

This project was built as part of a Blockchain Smart Contract and Frontend Integration task to gain practical experience in smart contract development, deployment, and frontend integration using ethers.js.



Features-

* ERC-20 token implementation
* Burnable token functionality
* Capped maximum token supply
* Owner-only minting
* Optional reward during minting
* Adjustable reward percentage (Basis Points)
* Owner-only selfDestruct function
* MetaMask wallet integration
* View token balance
* Transfer tokens from the frontend



Tech Stack-

Smart Contract
* Solidity (v0.8.24)
* OpenZeppelin Contracts
* Remix IDE

Frontend
* React
* Vite
* ethers.js

Blockchain
* MetaMask
* Ethereum Sepolia Testnet

Version Control
* Git
* GitHub



Smart Contract Details

Contract Name:
CGStoken

Token Name: 
Campus Token

Token Symbol: 
CT

Contract Address:
0x66719957A4124ea2EDbb2634945cDFd693a42443

Network:
Ethereum Sepolia Testnet

Etherscan:
https://sepolia.etherscan.io/address/0x66719957A4124ea2EDbb2634945cDFd693a42443



Frontend Features-

The React frontend allows users to:

* Connect their MetaMask wallet
* View the connected wallet address
* Check their token balance
* Mint tokens (Owner only)
* Burn tokens
* Transfer tokens to another wallet



Getting Started-

Clone the repository:
 
git clone https://github.com/diyad05/Campus-Token-Project.git


Move to the frontend folder:

cd Frontend


Install dependencies:

npm install


Run the development server:

npm run dev


Open your browser and visit:

http://localhost:5173

Connect your MetaMask wallet to the Sepolia Test Network before interacting with the application.



Screenshots-

Screenshots demonstrating contract deployment, MetaMask connection, token balance, minting, burning, token transfers, and the project structure are available in the screenshots folder.



What I Learned-

Building this project helped me understand:

* ERC-20 token development using Solidity
* Using OpenZeppelin contracts for secure development
* Deploying smart contracts on the Sepolia Testnet
* Connecting MetaMask with a React application
* Interacting with smart contracts using ethers.js
* Managing a project using Git and GitHub



Known Issues-

* After a successful transaction, the input fields retain their previous values until they are cleared manually. This is a minor UI issue and does not affect the smart contract functionality.
* The selfDestruct function is included because it was part of the assignment requirements. It is restricted to the contract owner and is not recommended for production smart contracts due to changes in recent Ethereum upgrades.



Future Improvements-

* Improve the user interface and overall user experience
* Display transaction history
* Add toast notifications for successful and failed transactions
* Automatic network detection and switching
* Better error handling and validation
* Add automated testing using Hardhat



Author-

Diya Dhakad
GitHub: https://github.com/diyad05

