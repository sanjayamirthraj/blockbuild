// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractDemo {
    address public owner;
    mapping(address => bool) public connectedWallets;
    bool public swapEnabled;
    
    event WalletConnected(address indexed wallet);
    event WalletDisconnected(address indexed wallet);
    event TokensSwapped(address indexed wallet, uint256 amount);

    constructor() {
        owner = msg.sender;
        swapEnabled = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier walletConnected() {
        require(connectedWallets[msg.sender], "Wallet not connected");
        _;
    }

    function connectWallet() external {
        require(!connectedWallets[msg.sender], "Wallet already connected");
        connectedWallets[msg.sender] = true;
        emit WalletConnected(msg.sender);
    }

    function disconnectWallet() external walletConnected {
        connectedWallets[msg.sender] = false;
        emit WalletDisconnected(msg.sender);
    }

    function swapTokens(uint256 amount) external walletConnected {
        require(swapEnabled, "Token swapping is disabled");
        require(amount > 0, "Amount must be greater than zero");
        
        // Token swap logic

        emit TokensSwapped(msg.sender, amount);
    }

    function enableSwap(bool _enabled) external onlyOwner {
        swapEnabled = _enabled;
    }
}