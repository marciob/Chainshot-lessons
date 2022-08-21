// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library UIntFunctions {
    function isEven(uint _par)public pure returns(bool){
        bool _isEven;
        if(_par%2 == 0){
            return _isEven = true;
        } else{
            return _isEven = false;
        }
    }
}