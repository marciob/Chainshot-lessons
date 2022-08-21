// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Game.sol";

contract Bet {
	Game public game;

	constructor(address _gameAddress){
		game = Game(_gameAddress);
	}

	function getScoreDifference(Game.Teams teamNumber) public view returns(int) {
		if(teamNumber == Game.Teams.Team1) {
			return game.team1Score() - game.team2Score();
		}
		return game.team2Score() - game.team1Score();
	}

	function placeBet(Game.Teams _number) payable public returns(uint256){
		return calculatePayout(msg.value, getScoreDifference(_number));
	}

	// calculates the payout of a bet based on the score difference between the two teams
	function calculatePayout(uint amount, int scoreDifference) private pure returns(uint) {
		uint abs = uint(scoreDifference > 0 ? scoreDifference : scoreDifference * -1);	
		uint odds = 2 ** abs;
		if(scoreDifference < 0) {
			return amount + amount / odds;
		}
		return amount + amount * odds;
	}
}