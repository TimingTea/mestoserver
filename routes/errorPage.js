const errorPage = (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
  res.status(500).json({ message: 'Запрашиваемый файл не найден' });
};

module.exports = { errorPage };
