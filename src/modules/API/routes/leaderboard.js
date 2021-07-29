const router = require('express').Router();

router.get('/', function(req, res, next) {

    const watchers = req.watchers;
    if (!watchers) return res.status(500).send({ 'error': 'server error' });

    let coins = watchers
        .map(w => {
            return {
                base: w.base,
                quota: w.quota,
                price: w.price || null
            }
        })
        .sort((a, b) => b.price - a.price);

    res.status(200).send(coins);

});

module.exports = router;
