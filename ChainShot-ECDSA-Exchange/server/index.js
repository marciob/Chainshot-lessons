const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const SHA256 = require("crypto-js/sha256");

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {
  // "1": 100,
  // "2": 50,
  // "3": 75,
}

const privateData = {};

const balanceAboveZero = {};

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//generating addresses
function generateAddress(n) {
  for (let i = 0; i < n; i++) {
    const key = ec.genKeyPair();

    const walletData = {
      privateKey: key.getPrivate().toString(16),
      publicKey: key.getPublic().encode('hex')
    }

    const publicKeyBig = SHA256(walletData.publicKey).toString();
    const publicKeyShorten = publicKeyBig.slice(-40);

    const randomValue = Math.floor(Math.random() * 100);

    //add a new element to 
    balances[publicKeyShorten] = 200 * randomValue;

    //add private key to privateData object
    privateData[publicKeyShorten] = walletData.privateKey;
  }
}

generateAddress(3);


//create an object with balances above 0
for (let i = 0; i < Object.keys(balances).length; i++) {
  if (balances[Object.keys(balances)[i]] > 0) {
    balanceAboveZero[Object.keys(balances)[i]] = balances[Object.keys(balances)[i]];
  }
}

console.log("Balances above 0", balanceAboveZero);
console.log("Public Key and Private Key", privateData);


app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { sender, recipient, amount, privateKey } = req.body;
  //it only allows make transaction if the user passes the correct privateKey
  if (privateData[sender] == privateKey) {
    balances[sender] -= amount;
    balances[recipient] = (balances[recipient] || 0) + +amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
