// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSwap {
    address public owner;
    bool public isConnected;

    event WalletConnected(address indexed user);
    event WalletDisconnected(address indexed user);
    event TokensSwapped(address indexed user, uint256 amountIn, uint256 amountOut);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyConnected() {
        require(isConnected, "Wallet not connected");
        _;
    }

    constructor() {
        owner = msg.sender;
        isConnected = false;
    }

    function connectWallet() external onlyOwner {
        isConnected = true;
        emit WalletConnected(msg.sender);
    }

    function swapTokens(uint256 amountIn, uint256 rate) external onlyConnected {
        // Swap logic here
        uint256 amountOut = amountIn * rate; // Simplified example of swap logic
        emit TokensSwapped(msg.sender, amountIn, amountOut);
    }

    function disconnectWallet() external onlyOwner {
        isConnected = false;
        emit WalletDisconnected(msg.sender);
    }
}