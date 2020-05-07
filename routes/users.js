const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);


module.exports = userRouter;
