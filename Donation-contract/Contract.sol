// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address payable public owner;
    address payable public charity;

    constructor(address payable _charity){
        owner = payable(msg.sender);
        charity = _charity;
    }

    receive() external payable {}

    function tip() public payable{
        (bool success, ) = owner.call{ value: msg.value }("");

    }

    function donate() public payable {
        //(bool success, ) = charity.call{ value: address(this).balance }("");

        selfdestruct(charity);
    }
}
