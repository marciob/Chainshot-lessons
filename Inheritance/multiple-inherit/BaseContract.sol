// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

contract Ownable {
        address owner;
constructor() { owner = msg.sender; }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
}

contract Transferable is Ownable {
    function transfer(address _to)external onlyOwner{
        owner = _to;
    }
}