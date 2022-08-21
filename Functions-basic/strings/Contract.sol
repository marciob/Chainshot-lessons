// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    bytes32 public msg1 = "Hello World";
	string public msg2 = "cccccccccccccccccccccccccccccccc";
}

//a string can be stored in both bytes or string types;
//it's preferable to be stored in sring type, because it's more human readable
//but if the string is shorter than 32 bytes, bytes32 is more efficient
//in that case it simplifies the computation since the memory is allocated ahead of time
//the maximum value size of a string depends on their characters, ex.:
// bytes32 msg1 = "cccccccccccccccccccccccccccccccc"; 
// bytes32 msg2 = "ćććććććććććććććć";
