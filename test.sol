// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSwap {
    address private owner;
    bool private walletConnected;

    event WalletConnected(address indexed user);
    event TokensSwapped(address indexed user, uint256 amount);
    event WalletDisconnected(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier isConnected() {
        require(walletConnected, "Wallet not connected");
        _;
    }

    constructor() {
        owner = msg.sender;
        walletConnected = false;
    }

    function connectWallet() public onlyOwner {
        walletConnected = true;
        emit WalletConnected(msg.sender);
    }

    function swapTokens(uint256 amount) public isConnected {
        require(amount > 0, "Amount must be greater than zero");
        // Add logic to swap tokens here
        emit TokensSwapped(msg.sender, amount);
    }

    function disconnectWallet() public onlyOwner isConnected {
        walletConnected = false;
        emit WalletDisconnected(msg.sender);
    }
}
