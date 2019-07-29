const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('The Shortest URL of All!')
});

app.listen(3000, () => {
  console.log('Sam\'s link shortener is open for business');
})
