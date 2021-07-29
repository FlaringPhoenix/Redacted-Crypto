const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.status(200).send({ 'status': 'ok' });
});

router.use('/uptime', require('./uptime'));
router.use('/coin', require('./coin'));
router.use('/coins', require('./coins'));
router.use('/ratelimit', require('./ratelimit'));
router.use('/leaderboard', require('./leaderboard'));

module.exports = router;
