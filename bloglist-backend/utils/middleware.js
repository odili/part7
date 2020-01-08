const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.header('Authorization');
  // console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
    next();
  } else {
    next();
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
