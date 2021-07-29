require('dotenv').config();
const RedactedCrypto = require('../');

const port = 3000;

let BTC = new RedactedCrypto.Watcher('BTCUSDT', 'BTC', 'USDT', 'binance');
let ETH = new RedactedCrypto.Watcher('ETHUSDT', 'ETH', 'USDT', 'binance');

let client = new RedactedCrypto.Client([BTC, ETH], port, 10);

BTC.on('trade', (trade) => {
    console.log(trade);
});