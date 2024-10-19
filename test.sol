// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract SecureSwap {
    function swap(address coinA, address coinB) external {
        IERC20 tokenA = IERC20(coinA);
        IERC20 tokenB = IERC20(coinB);

        uint256 amountA = tokenA.balanceOf(msg.sender);
        uint256 amountB = tokenB.balanceOf(msg.sender);

        require(amountA > 0, "Insufficient balance of coinA");
        require(amountB > 0, "Insufficient balance of coinB");

        require(
            tokenA.transferFrom(msg.sender, address(this), amountA),
            "Transfer of coinA failed"
        );
        require(
            tokenB.transferFrom(msg.sender, address(this), amountB),
            "Transfer of coinB failed"
        );

        require(
            tokenA.transfer(msg.sender, amountA),
            "Return transfer of coinA failed"
        );
        require(
            tokenB.transfer(msg.sender, amountB),
            "Return transfer of coinB failed"
        );
    }
}
