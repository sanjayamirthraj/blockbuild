// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSwap {
    address public token1;
    address public token2;
    address public owner;
    mapping(address => uint256) public balances;

    event Swapped(address indexed user, address tokenSwapped, address tokenReceived, uint256 amount);

    constructor(address _token1, address _token2) {
        token1 = _token1;
        token2 = _token2;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function swap(address _tokenFrom, uint256 _amount) external {
        require(_tokenFrom == token1 || _tokenFrom == token2, "Invalid token");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        address tokenTo = _tokenFrom == token1 ? token2 : token1;
        
        balances[msg.sender] -= _amount;
        balances[tokenTo] += _amount;

        emit Swapped(msg.sender, _tokenFrom, tokenTo, _amount);
    }

    function allocateTokens(address _user, uint256 _amount, address _token) external onlyOwner {
        require(_token == token1 || _token == token2, "Invalid token");
        balances[_user] += _amount;
    }

    function disconnect() external onlyOwner {
        selfdestruct(payable(owner));
    }
}
```
