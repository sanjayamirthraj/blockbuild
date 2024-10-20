// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenContract {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function allocateTokens(address recipient, uint256 amount) external onlyOwner {
        require(recipient != address(0), "Invalid address");
        balances[recipient] += amount;
    }

    function swapTokens(address from, address to, uint256 amount) external {
        require(balances[from] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid recipient address");
        
        balances[from] -= amount;
        balances[to] += amount;
    }

    function connectWallet() external view returns (string memory) {
        return "Wallet connected";
    }

    function disconnect() external view returns (string memory) {
        return "Disconnected";
    }
}
```
