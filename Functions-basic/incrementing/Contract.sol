// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint public x;
    
    constructor(uint value){
        x = value;
    }

    function increment() external {
        x++;
    }

    function add(uint _par) public view returns(uint){
        return x + _par;
    }
}

// it has a public variable uint x
// two functions:
// increment() adds +1 to variable x
// add() adds any uint parameter to the variable x