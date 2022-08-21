// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	function double(uint x) public pure returns(uint) {
		return x * 2;
	}
	
	function double(uint a, uint b) external pure returns(uint, uint) {
		return (double(a), double(b));
	}
}

// it has 2 functions with the same name but with different argument structure, so it doesn't overlap:
// double() function with one argument that multiples the parameter by 2
// double() with two arguments, that multiples both parameters by 2
// both functions are pure because it doesn't read nor write to state
