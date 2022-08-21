const { utils, providers, Wallet } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
  // TODO: donate to charity!
  const oneEther = utils.parseEther("1.0");
  const wallet = new Wallet(privateKey, provider);

  for (let i = 0; i < charities.length; i++) {
    const charity = charities[i];
    await wallet.sendTransaction({
      value: oneEther,
      to: charity,
    });
  }
}

module.exports = donate;

//the function donate takes a private key and an array of charity addresses as it's two arguments
//the private key corresponds to an address pre-loaded with 10 ETH
