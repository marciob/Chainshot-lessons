const { assert } = require("chai");
describe("DaiExchange", function () {
  let daiExchange;
  let daiContract;
  let priceFeed;
  let signer2;
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

    signer2 = ethers.provider.getSigner(1);
  });

  describe("a successful trade of 1 ether", () => {
    const ether = ethers.utils.parseEther("1");
    beforeEach(async () => {
      await signer2.sendTransaction({ to: daiExchange.address, value: ether });
      await daiExchange.connect(signer2).trade();
    });

    it("should transfer 100 dai to the account balance", async () => {
      const balance = await daiContract.balances(await signer2.getAddress());
      const expectedDai = ethers.utils.parseEther("100");
      assert.equal(balance.toString(), expectedDai.toString());
    });
  });

  describe("a successful trade of 2 ether", () => {
    const ether = ethers.utils.parseEther("2");
    beforeEach(async () => {
      await signer2.sendTransaction({ to: daiExchange.address, value: ether });
      await daiExchange.connect(signer2).trade();
    });

    it("should transfer 200 dai to the account balance", async () => {
      const balance = await daiContract.balances(await signer2.getAddress());
      const expectedDai = ethers.utils.parseEther("200");
      assert.equal(balance.toString(), expectedDai.toString());
    });
  });

  describe("a two unsuccessful trades", () => {
    const ether = ethers.utils.parseEther("2");
    beforeEach(async () => {
      await priceFeed.shutdown();
      await signer2.sendTransaction({ to: daiExchange.address, value: ether });
      await daiExchange.connect(signer2).trade();
      await daiExchange.connect(signer2).trade();
    });

    it("should have 0 dai in the account balance", async () => {
      const balance = await daiContract.balances(await signer2.getAddress());
      assert.equal(balance.toString(), "0");
    });

    it("should update the number of failedAttempts", async () => {
      const attempts = await daiExchange.failedAttempts();
      assert.equal(attempts, 2);
    });
  });
});
