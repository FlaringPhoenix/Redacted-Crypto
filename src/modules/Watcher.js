const ccxws = require('ccxws');
const EventEmitter = require('events');

class Watcher extends EventEmitter {
    constructor(id, base, quota, exchange) {
        super();

        // Total Trades
        this.trades = 0;

        // Exchanges
        this.binance = new ccxws.Binance();
        this.coinbasepro = new ccxws.CoinbasePro();

        // Check exchanges
        this.exchanges = ['binance'];
        if (!this.exchanges.includes(exchange)) throw new Error('Invalid exchange');
        this.exchange = this[exchange];

        // Base options
        this._id = id;
        this._base = base;
        this._quota = quota;

        // Start Websocket Connection
        this._start();
    }

    _start() {
        this.exchange.subscribeTrades({ id: this.id, base: this.base, quote: this.quota });
        let that = this;
        this.exchange.on("trade", trade => that.handleTrade(trade));
        return;
    }

    handleTrade(trade) {
        this._price = trade.price;
        this.emit('trade', trade);
        return;
    }

    get id() {
        return this._id;
    }

    get price() {
        return this._price;
    }

    get base() {
        return this._base;
    }
    
    get quota() {
        return this._quota;
    }

}

module.exports = Watcher;