const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on port 3000');
});
