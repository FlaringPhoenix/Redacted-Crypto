const BaseModule = require('../BaseModule');

const Cache = require('liquidcache');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');
const middleware = require('./middleware');

class API extends BaseModule {
    constructor(watchers = [], port = 3000, auth = true, rateLimit = 10) {
        super('API');

        this.watchers = watchers;
        this.port = port;
        this.rateLimit = 10;
        //this.isProduction = process.env.PRODUCTION || false;

        // Create express app
        this.app = express();
        this.build();

        // Cache coins
        Cache.set('coins', watchers.map(m => m.base));
    }

    build() {
        if (this.auth) this.app.use(middleware.auth(this.rateLimit));
        this.app.use(middleware.ratelimit());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(require('method-override')());
        this.app.use(helmet());
        this.app.use(cors());

        // CORS middleware
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });

        // Error handler
        this.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({'errors': {
                message: err.message,
                error: {}
            }});
        });

        // Log 
        let that = this;
        this.app.use((req, res, next) => {
            // Add watchers to request object
            req.watchers = that.watchers;

            // Log in console
            let realip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(':').pop();
            that.log(`[${req.method}] request on ${req.originalUrl} from ${realip}`);
            next();
        });

        //if (!this.isProduction) this.app.use(logger('dev'));
          
        super.log('Loading routes...');
        this.app.use('/', routes);

        super.log('Running on port: ' + this.port);
        this.app.listen(this.port);

        super.log('Watching: ' + this.watchers.map(w => w.base))
    }

}

module.exports = API;