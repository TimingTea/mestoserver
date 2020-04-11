const fs = require('fs');
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');
const getCardsMiddleware = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(400).send({ message: 'Ошибка чтения файла' });
      return next(true);
    }
    try {
      const cards = JSON.parse(data);
      req.cards = cards;
      next();
    // eslint-disable-next-line no-shadow
    } catch (err) {
      res.status(400).send({ message: 'Ошибка в файле' });
      return next(true);
    }
  });
};

const getCards = (req, res) => {
  res.send(req.cards);
};

module.exports = { getCardsMiddleware, getCards };
