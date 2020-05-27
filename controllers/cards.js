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
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(`Карточки с таким id  ${req.params.cardId} не существует`))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещен, нельзя удалить карточку другого пользователя');
      }
      return Card.deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
