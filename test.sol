// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDEX {
    function swapTokens(address tokenA, address tokenB, uint amount) external;
}

contract WalletConnector {
    address public owner;
    bool public isConnected;

    IDEX public dex;

    constructor(address _dexAddress) {
        owner = msg.sender;
        dex = IDEX(_dexAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function connectWallet() external onlyOwner {
        require(!isConnected, "Already connected");
        isConnected = true;
    }

    function swapTokens(address tokenA, address tokenB, uint amount) external onlyOwner {
        require(isConnected, "Wallet not connected");
        dex.swapTokens(tokenA, tokenB, amount);
    }

    function disconnect() external onlyOwner {
        require(isConnected, "Already disconnected");
        isConnected = false;
    }
}