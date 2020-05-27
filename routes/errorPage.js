const NotFoundError = require('../errors/not-found');

const errorPage = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = { errorPage };
