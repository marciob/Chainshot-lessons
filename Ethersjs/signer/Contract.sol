// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Contract {
    address owner;
    string public message;

    constructor() {
        owner = msg.sender;
    }

    function modify(string calldata _message) external {
        require(msg.sender != owner, "Owner cannot modify the message!");
        message = _message;
    }
}
//tx.origin is the account that initialed the transaction (always an EOA)
//msg.sender is the account that immediatly called the contract (it might be an EOA or a Contract)
