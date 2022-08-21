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
	address owner;

	constructor(address daiAddress, address priceFeedAddress) {
		owner = msg.sender;
		daiToken = DaiToken(daiAddress);
		priceFeed = PriceFeed(priceFeedAddress);
	}

	receive() external payable { }

	function trade() external returns(bool) {
		require(owner == msg.sender);
		require(address(this).balance > 0);
		try priceFeed.ethToDai(address(this).balance) returns(uint dai) {
			daiToken.transfer(msg.sender, dai);
			return true;
		} catch {
			failedAttempts++;
			return false;
		}
	}
}