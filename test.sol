// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSwap {
    address public owner;
    mapping(address => uint256) public balances;
    bool public initialized;

    event TokensSwapped(address indexed user, uint256 amount);
    event TokensAllocated(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier isInitialized() {
        require(initialized, "Contract not initialized");
        _;
    }

    constructor() {
        owner = msg.sender;
        initialized = true;
    }

    function swapTokens(address _to, uint256 _amount) external isInitialized {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit TokensSwapped(msg.sender, _amount);
    }

    function allocateTokens(address _to, uint256 _amount) external onlyOwner isInitialized {
        balances[_to] += _amount;
        emit TokensAllocated(_to, _amount);
    }

    function disconnect() external onlyOwner {
        initialized = false;
    }
}