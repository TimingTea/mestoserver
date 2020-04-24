const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { errorPage } = require('./routes/errorPage');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5ea1a032fcd8c63074f145c0',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', errorPage);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен, приложение слушает порт: ${PORT}`);
});
