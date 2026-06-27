// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CGStoken is ERC20Burnable, ERC20Capped, Ownable {
    uint256 public rewardBasisPoints;

    constructor(
        uint256 cap,
        uint256 initialSupply,
        uint256 initialRewardBasisPoints
    )
        ERC20("Campus Token", "CT")
        ERC20Capped(cap)
        Ownable(msg.sender)
    {
        require(initialSupply <= cap, "Initial supply exceeds cap");
        require(initialRewardBasisPoints <= 1000, "Reward too high");

        rewardBasisPoints = initialRewardBasisPoints;
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount, bool includeReward) external onlyOwner {
        uint256 rewardAmount = 0;

        if (includeReward) {
            rewardAmount = (amount * rewardBasisPoints) / 10000;
        }

        _mint(to, amount + rewardAmount);
    }

    function setRewardBasisPoints(uint256 newRewardBasisPoints) external onlyOwner {
        require(newRewardBasisPoints <= 1000, "Reward too high");
        rewardBasisPoints = newRewardBasisPoints;
    }

    function selfDestruct(address payable recipient) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        selfdestruct(recipient);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Capped)
    {
        super._update(from, to, value);
    }
}