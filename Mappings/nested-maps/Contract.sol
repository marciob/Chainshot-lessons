// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

contract Contract {
	enum ConnectionTypes { 
		Unacquainted,
		Friend,
		Family
	}
	
	mapping(address => mapping(address => ConnectionTypes)) public connections;

	function connectWith(address other, ConnectionTypes connectionType) external {
		connections[msg.sender][other] = connectionType;
	}
}