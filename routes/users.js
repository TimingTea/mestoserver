/* eslint-disable array-callback-return */
const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-dynamic-require
const usersPath = path.join(__dirname, '../data/users.json');

const getUsersMiddleware = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(400).send({ message: 'Ошибка чтения файла' });
      return next(true);
      // eslint-disable-next-line no-else-return
    } else {
      try {
        const users = JSON.parse(data);
        req.users = users;
        next();
      // eslint-disable-next-line no-shadow
      } catch (err) {
        res.status(400).send({ message: 'Ошибка в файле' });
        return next(true);
      }
    }
  });
};

const getUsers = (req, res) => {
  res.status(200).send(req.users);
};

const getUser = (req, res) => {
  /* eslint no-underscore-dangle: 0 */
  // eslint-disable-next-line no-shadow
  const user = req.users.find((user) => user._id === req.params.id);
  // eslint-disable-next-line no-shadow
  req.users.find((user) => {
    // eslint-disable-next-line no-underscore-dangle
    if (!user) {
      res.status(404);
      res.send({ message: 'Нет пользователя с таким id' });
    }
  });
  res.status(200).send(user);
};

module.exports = { getUsers, getUser, getUsersMiddleware };
