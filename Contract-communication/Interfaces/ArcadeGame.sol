// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface ArcadeGame {
    function scores() external returns(uint, uint, uint);
}

contract Leaderboard {
	uint public highscore;

	function addGame(address gameAddress) public {
		ArcadeGame game = ArcadeGame(gameAddress);
		(uint x, uint y, uint z) = game.scores();
		if(x > highscore) {
			highscore = x;
		}
		if(y > highscore) {
			highscore = y;
		}
		if(z > highscore) {
			highscore = z;
		}
	}
}