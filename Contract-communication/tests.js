const { assert } = require("chai");
describe("Contract", function () {
  let bet;
  let game;
  before(async () => {
    const Game = await ethers.getContractFactory("Game");
    game = await Game.deploy();
    await game.deployed();

    const Bet = await ethers.getContractFactory("Bet");
    bet = await Bet.deploy(game.address);
    await bet.deployed();
  });

  describe("after adding to score1 twice", () => {
    before(async () => {
      await game.addScore(0);
      await game.addScore(0);
    });

    it("should give 4:1 odds for team1", async () => {
      const value = ethers.utils.parseEther("1.0");
      const payout = await bet.callStatic.placeBet(0, { value });
      assert.equal(payout.toString(), value.mul("5").toString());
    });

    it("should give 1:1.25 odds for team2", async () => {
      const value = ethers.utils.parseEther("1.0");
      const payout = await bet.callStatic.placeBet(1, { value });
      assert.equal(payout.toString(), value.mul("125").div("100").toString());
    });
  });

  describe("after adding to score2 three times", () => {
    before(async () => {
      await game.addScore(1);
      await game.addScore(1);
      await game.addScore(1);
    });

    it("should give 1:1.5 odds for team1", async () => {
      const value = ethers.utils.parseEther("1.0");
      const payout = await bet.callStatic.placeBet(0, { value });
      assert.equal(payout.toString(), value.mul("15").div("10").toString());
    });

    it("should give 2:1 odds for team2", async () => {
      const value = ethers.utils.parseEther("1.0");
      const payout = await bet.callStatic.placeBet(1, { value });
      assert.equal(payout.toString(), value.mul("3").toString());
    });
  });
});
