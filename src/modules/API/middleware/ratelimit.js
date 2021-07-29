const rateLimits = new Map();

module.exports = function (rateLimit = 10) {
    return function (req, res, next) {

      const interval = 10000;
      const maxRequests = rateLimit;
      const key = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(':').pop();
      
      let obj = {
        count: 0,
        start: null
      }

      // Update request count
      let current = rateLimits.get(key) || obj;
      if (!current.start) current.start = Date.now();

      current.count++;
      rateLimits.set(key, current);
      req.ratelimit = {
        current: current.count,
        limit: maxRequests,
        remaining: maxRequests - current.count
    };

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', maxRequests - current.count);

      if (Date.now() - current.start > interval) {
        rateLimits.delete(key);
        return next();
      }

      if (current.count > maxRequests) {
        return res.status(429).json({ 'error': 'Too many requests' });
      }

      return next();
    }
}