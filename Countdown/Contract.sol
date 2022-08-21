// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint count = 10;
    function tick() public {
        if(count == 1) {
            selfdestruct(payable(msg.sender));
        }
        count--;
    }
}

//After calling tick 10 times, it should selfdestruct the contract.
