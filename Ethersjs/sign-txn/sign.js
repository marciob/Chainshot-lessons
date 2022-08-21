const ethers = require("ethers");
const { Wallet, utils } = ethers;
const { wallet1 } = require("./wallets");

// sign the transaction using our wallet's private key
const signaturePromise = wallet1.signTransaction({
  value: utils.parseEther("1.0"),
  to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
  gasPrice: 0x3b9aca00,
  gasLimit: 0x5208,
});

module.exports = signaturePromise;

//result after signing that transaction:
//0xf86b80843b9aca0082520894dd0dc6fb59e100ee4fa9900c2088053bbe14de92880de0b6b3a7640000801ba0f503c1f50c6d97c0b34dd39b87c59d32934a1f0422ffe5d430730ea27a323e9ba02711bd4be63bfd78a74d5a5fd77aaa6d66a8b0415cb60326f21e2821232dd7a4
//understanding each piece:
// 0x - Prefix representing the rest of the message is in hexadecimal
// f86b - RLP Encoding indicating a list of 107 (0x6b) bytes is coming up next
// 80 - This is the nonce value (0) encoded in RLP
// 84 - RLP Encoding telling us a string of length 4 is coming next
// 3b9aca00 - The gasPrice that the sender is willing to pay, 1000000000 Wei or 1 Gwei.
// 82 - RLP Encoding telling us a string of length 2 is coming next
// 5208 - The gasLimit of the transaction which is the max amount willing to be paid, 21000 Wei.
// 94 - RLP Encoding telling us a string of length 20 is coming next
// dd0dc6…14de92 - The to address, which is a string of 20 hexadecimal characters
// 88 - RLP Encoding telling us a string of length 8 is coming next
// 0de0b6b3a7640000 - The amount in Wei being sent over this transaction (1000000000000000000 in decimal)
// 80 - Indicates that no data is being sent on this transaction. This is a value transfer, not a contract call. A contract call would use this field to invoke methods on the contract with parameters.
// 1b - This indicates whether the public key is on the positive side of the y-axis or negative, often referred to as the v value of the signature. This value makes signature recovery easier since the secp256k1 elliptic curve is symmetrical over the y-axis. Ever since EIP-155 was introduced in the Spurious Dragon Hard Fork, this value can also indicate the chain.
// a0 - RLP Encoding telling us a string of length 32 is coming next
// f503c1f…a323e9b - One of the coordinates of the digital signature known as r.
// a0 - RLP Encoding telling us a string of length 32 is coming next
// 2711bd…32dd7a4 - The other coordinate of the digital signature known as s.
