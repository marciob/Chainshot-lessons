const { assert } = require("chai");
describe("DaiExchange", function () {
  let daiExchange;
  let daiContract;
  let priceFeed;
  let signer2;
  let owner;
  beforeEach(async () => {
    const FeedContract = await ethers.getContractFactory("FeedContract");
    priceFeed = await FeedContract.deploy();
    await priceFeed.deployed();

    const Dai = await ethers.getContractFactory("DaiContract");
    daiContract = await Dai.deploy();
    await daiContract.deployed();

    const DaiExchange = await ethers.getContractFactory("DaiExchange");
    daiExchange = await DaiExchange.deploy(
      daiContract.address,
      priceFeed.address
    );
    await daiExchange.deployed();

    owner = ethers.provider.getSigner(0);
    signer2 = ethers.provider.getSigner(1);
  });

  describe("before depositing any funds", () => {
    it("should not allow a trade", async () => {
      let ex;
      try {
        await daiExchange.callStatic.trade();
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, "Expected Trade to Revert Without a Balance!");
    });
  });

  describe("after depositing funds", () => {
    beforeEach(async () => {
      await owner.sendTransaction({
        to: daiExchange.address,
        value: ethers.utils.parseEther("2"),
      });
    });

    it("should not allow a non-owner to trade", async () => {
      let ex;
      try {
        await daiExchange.connect(signer2).trade();
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, "Expected Trade From a Non-Owner to Revert!");
    });

    describe("after a successful trade", () => {
      let returnValue;
      beforeEach(async () => {
        returnValue = await daiExchange.callStatic.trade();
        await daiExchange.trade();
      });

      it("should return true", () => {
        assert(returnValue, "Expected function `trade` to return `true`!");
      });

      it("should transfer 200 dai to the account balance", async () => {
        const balance = await daiContract.balances(await owner.getAddress());
        const expectedDai = ethers.utils.parseEther("200");
        assert.equal(balance.toString(), expectedDai.toString());
      });
    });
  });

  describe("an unsuccessful trade", () => {
    let returnValue;
    beforeEach(async () => {
      await priceFeed.shutdown();
      await owner.sendTransaction({
        to: daiExchange.address,
        value: ethers.utils.parseEther("2"),
      });
      returnValue = await daiExchange.callStatic.trade();
      await daiExchange.trade();
    });

    it("should return false", () => {
      assert(!returnValue, "Expected function `trade` to return `false`!");
    });

    it("should have 0 dai in the account balance", async () => {
      const balance = await daiContract.balances(await owner.getAddress());
      assert.equal(balance.toString(), "0");
    });

    it("should update the number of failedAttempts", async () => {
      const attempts = await daiExchange.failedAttempts();
      assert.equal(attempts, 1);
    });
  });
});
