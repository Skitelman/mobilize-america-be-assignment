import express from 'express';
import asyncHandler from 'express-async-handler';
import idx from 'idx';

import { getLink } from '../middleware/getLink';

const generalStatsController = express.Router();

generalStatsController.get(
  '/topLinks',
  asyncHandler(async (req, res) => {
    const { db } = res.locals;

    const [topLinks] = await db.query(`SELECT l.destinationURL, l.shortUrl, COUNT(lv.id) totalVisits FROM LinkVisits lv JOIN Links l on lv.linkId = l.id GROUP BY lv.linkId ORDER BY totalVisits DESC LIMIT 5;`);
    res.status(200).json({
      data: {
        topLinks
      }
    });
  })
);

export default generalStatsController;
