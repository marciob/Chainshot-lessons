// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address payable owner;
    uint price;

    event Deployed(address indexed _firstOwner);
    constructor(){
        owner = payable(msg.sender);
        emit Deployed(msg.sender);
    }   

    event Transfer(address indexed _originalOwner, address indexed _newOwner);
    function transfer(address payable _receipient) external {
        require(msg.sender == owner);
		owner = _receipient;        
        emit Transfer(msg.sender, _receipient);
    }

    event ForSale(uint _price, uint _currentBlockTimestamp);
    function markPrice(uint askingPrice) public{
        require(msg.sender == owner);
        price = askingPrice;
        emit ForSale(askingPrice,block.timestamp);
    }

    event Purchase(uint amount, address indexed buyer);
    function purchase() payable external{
		require(msg.value == price, "1");
        require(price > 0, "2");
        price = 0;
        owner.transfer(msg.value);
        owner = payable(msg.sender);
        emit Purchase(msg.value, msg.sender);
    }
}

//Events are typically UpperCamelCase whereas function names are lowerCamelCase