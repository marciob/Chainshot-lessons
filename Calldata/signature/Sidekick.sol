// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function sendAlert(address hero) external {
        bytes4 signature = bytes4(keccak256("alert()"));

        (bool success, ) = hero.call(abi.encodePacked(signature));

        require(success);
    }
}

//it calls a alert() function from hero contract
//to do that it gets the signature function in a hash format
//and it gets the first 4 bytes of the hash of the signed function to pass as calldata
//in a calldata, a function is called by taking its signature and hashing it with keccak256, then taking the first 4 bytes
