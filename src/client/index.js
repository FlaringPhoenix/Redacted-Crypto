const API = require('../modules/API');

class Client {
    constructor(watchers = [], port = 3000, rateLimit = 10) {
        this.API = new API(watchers, port, false, rateLimit);
    }
}

module.exports = Client;