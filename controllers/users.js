const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretkey } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');
const UnauthorizedError = require('../errors/unauthorized');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};


// eslint-disable-next-line consistent-return
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (password.length < 10) throw new UnauthorizedError('Длина пароля меньше 10 символов');

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user.omitPrivate()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new UnauthorizedError(err.message);
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretkey,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 3600,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
};
