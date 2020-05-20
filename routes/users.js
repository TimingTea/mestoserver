const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum(),
  }),
}), getUser);


module.exports = userRouter;
