// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract TokenSwap {

    address public owner;
    address public token1;
    address public token2;
    uint256 public rate; // Rate of token1 to token2

    event WalletConnected(address indexed user);
    event TokensSwapped(address indexed user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut);
    event LiquidityAdded(address indexed user, uint256 amountToken1, uint256 amountToken2);
    event WalletDisconnected(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _token1, address _token2, uint256 _rate) {
        owner = msg.sender;
        token1 = _token1;
        token2 = _token2;
        rate = _rate;
    }

    function connectWallet() external {
        emit WalletConnected(msg.sender);
    }

    function swapTokens(uint256 amountIn) external {
        require(IERC20(token1).balanceOf(msg.sender) >= amountIn, "Insufficient balance");
        uint256 amountOut = amountIn * rate / (10 ** 18);
        require(IERC20(token2).balanceOf(address(this)) >= amountOut, "Insufficient contract balance");

        IERC20(token1).transferFrom(msg.sender, address(this), amountIn);
        IERC20(token2).transfer(msg.sender, amountOut);

        emit TokensSwapped(msg.sender, token1, token2, amountIn, amountOut);
    }

    function addLiquidity(uint256 amountToken1, uint256 amountToken2) external {
        require(IERC20(token1).balanceOf(msg.sender) >= amountToken1, "Insufficient token1 balance");
        require(IERC20(token2).balanceOf(msg.sender) >= amountToken2, "Insufficient token2 balance");

        IERC20(token1).transferFrom(msg.sender, address(this), amountToken1);
        IERC20(token2).transferFrom(msg.sender, address(this), amountToken2);

        emit LiquidityAdded(msg.sender, amountToken1, amountToken2);
    }

    function disconnect() external {
        emit WalletDisconnected(msg.sender);
    }

    function updateRate(uint256 _rate) external onlyOwner {
        rate = _rate;
    }

    function withdraw(address _token, uint256 amount) external onlyOwner {
        IERC20(_token).transfer(owner, amount);
    }
}