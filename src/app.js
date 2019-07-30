import express from 'express';
import idx from 'idx';

const app = express();

app.get('/', (req, res) => {
  res.send('The Shortest URL of All!')
});

app.get('/:shortLink', (req, res) => {
  const shortLink = idx(req, _ => _.params.shortLink); 
  console.log(`You say you want to go to ${req.params.shortLink}`);
  res.redirect('https://www.nytimes.com');
})

app.listen(3000, () => {
  console.log('Sam\'s link shortener is open for business');
})
