const Cache = require('liquidcache');
const router = require('express').Router();

router.get('/', function(req, res, next) {
    let coins = Cache.get('coins');
    res.status(200).send({
        'total': coins.size,
        'coins': coins
    });
});

module.exports = router;
