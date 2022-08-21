pragma solidity ^0.8.4;

contract Contract {
    function sumAndAverage(uint a, uint b, uint c, uint d) external pure returns(uint sum, uint average) {
        sum = a+b+c+d;
        average = sum/4;
    }
}

//it finds both the sum and the average of the four numbers
//it Returns these two values in this order as unsigned integers
