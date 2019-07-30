import express from 'express';
import cors from 'cors';
import idx from 'idx';

import redirectController from './controllers/redirect_controller';
import linkController from './controllers/link_controller';
import statsController from './controllers/stats_controller';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(redirectController);
app.use('/link', linkController);
app.use('/stats', statsController);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'The Shortest URL of All!' });
});

app.listen(3000, () => {
  console.log('Sam\'s link shortener is open for business');
})
