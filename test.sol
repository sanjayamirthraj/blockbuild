// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract SecureEfficientSwap {

    function swap(address coinA, address coinB) external {
        require(coinA != address(0) && coinB != address(0), "Invalid address");

        IERC20 tokenA = IERC20(coinA);
        IERC20 tokenB = IERC20(coinB);

        uint256 amountA = tokenA.balanceOf(msg.sender);
        uint256 amountB = tokenB.balanceOf(msg.sender);

        require(amountA >= 0, "Insufficient balance for token A");
        require(amountB >= 0, "Insufficient balance for token B");

        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Transfer failed for token A");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Transfer failed for token B");

        require(tokenA.approve(msg.sender, amountA), "Approval failed for token A");
        require(tokenB.approve(msg.sender, amountB), "Approval failed for token B");

        require(tokenA.transferFrom(address(this), msg.sender, amountB), "Transfer back failed for token A");
        require(tokenB.transferFrom(address(this), msg.sender, amountA), "Transfer back failed for token B");
    }
}