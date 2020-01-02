const { NODE_ENV } = require('./config');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  return res.status(err.statusCode || 500).json({
    status: err.statusCode,
    message: err.message,
    error: NODE_ENV === 'development' ? err.result : {},
  });
}

module.exports = { notFound, errorHandler };
