const router = require('express').Router();

router.get('/:coin', function(req, res, next) {

    const watchers = req.watchers;
    if (!watchers) return res.status(500).send({ 'error': 'server error' });

    // Check for param
    let coin = req.params?.coin;
    if (!coin) {
        return res.status(400).send({ 'error': 'invalid request' });
    }

    // Check if coin name is valid
    let found = watchers.find(w => (w?.base).toLowerCase() == coin.toLowerCase());
    if (found === undefined) {
        return res.status(404).send({ 'error': 'not found' });
    }

    res.status(200).send({
        base: found.base,
        quota: found.quota,
        price: found.price || null
    })

});

module.exports = router;
