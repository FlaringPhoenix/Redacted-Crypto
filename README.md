# Redacted-Crypto

# About
Redacted-Crypto is a nice, simple, and clean NPM package that everyone can use. You can use it to track crypto currency trades from markets like binance.

## Preview

![Preview](https://i.gyazo.com/adcfd0e6d05e5cfb8645f3d083e91092.png)
![Preview](https://i.gyazo.com/8e0399230dc2d66f2bc54200d7f427b5.png)

# Installation

Run the following command to install the npm package

```bash
npm i redacted-crypto
```

## Usage

### Basic Usage:
```javascript
const Status = require('redacted-crypto');

let BTC = new RedactedCrypto.Watcher('BTCUSDT', 'BTC', 'USDT', 'binance');

BTC.on('trade', (trade) => {
    console.log(trade);
});
```

### Advanced Usage:
```javascript
const Status = require('redacted-crypto');

const port = 3000;
const debug = false;
const rateLimit = 10; // requests per second

let BTC = new RedactedCrypto.Watcher('BTCUSDT', 'BTC', 'USDT', 'binance');
let ETH = new RedactedCrypto.Watcher('ETHUSDT', 'ETH', 'USDT', 'binance');

// Starts Rest API
let client = new RedactedCrypto.Client([BTC, ETH], port, debug, ratelimit);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
