const Card = require('../models/card');
const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');


const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      } if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Доступ запрещен');
      }
      return Card.findByIdAndRemove(cardId)
        .then((cardForRemove) => {
          res.send(cardForRemove);
        });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
