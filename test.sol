// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for ERC20 token to interact with other tokens
interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
}

// Secure and Efficient Smart Contract for Swapping Tokens
contract ContractDemo {
    address public token1;
    address public token2;
    address public owner;

    // Event emitted when swap occurs
    event SwapInitialized(
        address initiator,
        uint256 amountIn,
        address tokenIn,
        address tokenOut
    );

    constructor(address _token1, address _token2) {
        token1 = _token1;
        token2 = _token2;
        owner = msg.sender;
    }

    // Modifier to ensure functions are called by owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Swap function allowing a user to swap token1 for token2
    function swapTokens(uint256 amountIn) external {
        // Ensure amount is greater than zero
        require(amountIn > 0, "Swap amount must be greater than zero");

        // Check allowance
        uint256 allowance = IERC20(token1).allowance(msg.sender, address(this));
        require(allowance >= amountIn, "Check the token allowance");

        // Transfer token1 from msg.sender to this contract
        require(
            IERC20(token1).transferFrom(msg.sender, address(this), amountIn),
            "Token transfer failed"
        );

        // Assuming a 1:1 swap ratio for simplicity
        uint256 amountOut = amountIn;

        // Transfer token2 from this contract to msg.sender
        require(
            IERC20(token2).balanceOf(address(this)) >= amountOut,
            "Insufficient token2 balance in contract"
        );
        require(
            IERC20(token2).transfer(msg.sender, amountOut),
            "Token transfer failed"
        );

        // Emit an event when the swap is initialized
        emit SwapInitialized(msg.sender, amountIn, token1, token2);
    }

    // Owner function to withdraw any token from the contract
    function withdrawTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(
            IERC20(tokenAddress).balanceOf(address(this)) >= amount,
            "Insufficient balance in contract"
        );
        require(
            IERC20(tokenAddress).transfer(owner, amount),
            "Token transfer failed"
        );
    }
}
