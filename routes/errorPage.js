const errorPage = (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports = { errorPage };
