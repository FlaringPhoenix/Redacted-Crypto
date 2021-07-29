module.exports = {
    Client: require('./client'),
    Version: require('../package.json')['version'],
    Watcher: require('./modules/Watcher'),
    API: require('./modules/API')
}