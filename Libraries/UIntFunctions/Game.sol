// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./UIntFunctions.sol";

contract Game {
    using UIntFunctions for uint;    
    uint public participants;
    bool public allowTeams;

    constructor(uint _participantsNumber){
        participants = _participantsNumber;

        if(_participantsNumber.isEven()){
            allowTeams = true;
        }else{
            allowTeams = false;
        }
    }

}
