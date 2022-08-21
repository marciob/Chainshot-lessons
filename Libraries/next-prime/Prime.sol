// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
function dividesEvenly(uint x, uint y) public pure returns(bool) {
		return x % y == 0;
	}

function isPrime(uint _par)	public pure returns(bool){
	bool _isPrime;

	if(dividesEvenly(_par, 1) && dividesEvenly(_par, _par) && !dividesEvenly(_par, 2) && !dividesEvenly(_par, 51)){
		return _isPrime = true;
	}else {
		return _isPrime = false;
	}
}
}