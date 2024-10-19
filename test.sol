// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenSwap {
    address public walletOwner;
    bool public walletConnected;

    event WalletConnected(address indexed owner);
    event TokensSwapped(address indexed buyer, address indexed tokenSold, address indexed tokenBought, uint256 amountSold, uint256 amountBought);
    event WalletDisconnected(address indexed owner);

    modifier onlyConnected() {
        require(walletConnected, "Wallet not connected");
        _;
    }

    constructor() {
        walletOwner = msg.sender;
    }

    function connectWallet() external {
        require(msg.sender == walletOwner, "Only wallet owner can connect wallet");
        walletConnected = true;
        emit WalletConnected(msg.sender);
    }

    function swapTokens(address fromToken, address toToken, uint256 amount) external onlyConnected {
        IERC20(fromToken).transferFrom(msg.sender, address(this), amount);
        uint256 balanceBefore = IERC20(toToken).balanceOf(address(this));
        // Placeholder for token swap logic
        uint256 amountBought = IERC20(toToken).balanceOf(address(this)) - balanceBefore;
        IERC20(toToken).transfer(msg.sender, amountBought);
        emit TokensSwapped(msg.sender, fromToken, toToken, amount, amountBought);
    }

    function disconnectWallet() external {
        require(msg.sender == walletOwner, "Only wallet owner can disconnect wallet");
        walletConnected = false;
        emit WalletDisconnected(msg.sender);
    }
}