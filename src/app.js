import express from 'express';
import cors from 'cors';
import idx from 'idx';
import asyncHandler from 'express-async-handler';

import dbClient from './services/dbClient';

import redirectController from './controllers/redirect_controller';
import linkController from './controllers/link_controller';
import LinkStatsController from './controllers/link_stats_controller';
import generalStatsController from './controllers/general_stats_controller';

export const server = (db, port) => {
  const app = express();
  app.set('trust proxy', true);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Make db client in res object
  app.use((req, res, next) => {
    res.locals = {
      db: dbClient,
    };
    return next();
  });

  app.use('/generalStats', generalStatsController);
  app.use(redirectController);
  app.use('/link', linkController);
  app.use('/stats', LinkStatsController);

  app.get('/', asyncHandler(async (req, res) => {
    await res.locals.db.authenticate(); 
    res.status(200).json({ data: 'The Shortest URL of All!' });
  }));

  if(!module.parent) {
    app.listen(port, () => {
      console.log('Sam\'s link shortener is open for business');
    });
  }

  return app;
}

server(dbClient, 3000);
