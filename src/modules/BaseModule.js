const chalk = require('chalk');

class BaseManager {
    constructor(title = 'UNKNOWN') {   
        this.title = title;     
        this.cache = require('liquidcache');
    }

    add(key, data) {
        return this.cache.set(key, data);
    }

    log(message) {
        console.log(`${chalk.blue("[LOG]")} ${chalk.gray(`${this.title}:`)} ${chalk.yellow(message)}`);
    }
}

module.exports = BaseManager;