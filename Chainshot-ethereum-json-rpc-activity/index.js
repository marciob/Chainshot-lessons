const axios = require('axios');

// copy-paste your URL from Alchemy
const ALCHEMY_URL = "https://eth-mainnet.alchemyapi.io/v2/03d1u2DyG7Rf0NzPxfjfzzD9Q1YLs29T";

axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getTransactionByBlockNumberAndIndex",
    params: [
        "0xD77B51", // block 14121809
        "0x2"  // transaction index
    ]
}).then((response) => {
    console.log(response.data.result);
});