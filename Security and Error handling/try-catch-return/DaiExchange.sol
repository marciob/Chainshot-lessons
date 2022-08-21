// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface PriceFeed {
    function ethToDai(uint eth) external view returns(uint dai);
}

interface DaiToken {
	function transfer(address to, uint dai) external;
}

contract DaiExchange {
	PriceFeed priceFeed;
	DaiToken daiToken;
	uint public failedAttempts;

	constructor(address daiAddress, address priceFeedAddress) {
		daiToken = DaiToken(daiAddress);
		priceFeed = PriceFeed(priceFeedAddress);
	}

	receive() external payable { }

	function trade() external returns(bool) {
		try priceFeed.ethToDai(address(this).balance) returns(uint dai) {
			daiToken.transfer(msg.sender, dai);
			return true;
		} catch {
			failedAttempts++;
			return false;
		}
	}
}