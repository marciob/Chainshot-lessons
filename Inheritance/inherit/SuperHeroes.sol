// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./Hero.sol";

contract Warrior is Hero(200) { 
    function attack(address _enemyAddress) public override {
        Enemy enemy = Enemy(_enemyAddress);
        enemy.takeAttack(Hero.AttackTypes.Brawl);
    }
}

contract Mage is Hero(50) { 
    function attack(address _enemyAddress) public override {
        Enemy enemy = Enemy(_enemyAddress);
        enemy.takeAttack(Hero.AttackTypes.Spell);
    }
}
