const router = require('express').Router();
const { getUsersMiddleware, getUsers, getUser } = require('./users');
const { getCardsMiddleware, getCards } = require('./cards');
const { errorPage } = require('./errorPage');

router.get('/users', getUsersMiddleware, getUsers);
router.get('/cards', getCardsMiddleware, getCards);
router.get('/users/:id', getUsersMiddleware, getUser);
router.get('*', errorPage);

module.exports = router;
