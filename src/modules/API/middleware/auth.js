function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }

module.exports = function (options) {
    return function (req, res, next) {
      let token = getToken(req);
      if (!token || process.env.BEARER_TOKEN != token) {
        return res.status(403).json('forbidden');
      }
      Object.defineProperty(req, 'token', {
        value: token,
        writable: false
      });
      next();
    }
}