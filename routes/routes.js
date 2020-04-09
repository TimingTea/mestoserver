const router = require('express').Router();
const { getUsers, getUser } = require('./users');
const { getCards } = require('./cards');
const { errorPage } = require('./errorPage');

router.get('/users', getUsers);
router.get('/cards', getCards);
router.get('/users/:id', getUser);
router.get('*', errorPage);

module.exports = router;
