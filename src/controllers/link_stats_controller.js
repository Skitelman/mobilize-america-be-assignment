import express from 'express';
import asyncHandler from 'express-async-handler';
import idx from 'idx';

import { getLink } from '../middleware/getLink';

const statsController = express.Router();

statsController.get(
  '/:shortUrl',
  getLink,
  asyncHandler(async (req, res) => {
    const { db, link } = res.locals;

    // Get the total number of visits to the link
    const [totalLinkVisitResults] = await db.query(`SELECT COUNT(*) FROM LinkVisits WHERE linkId = ${link.id};`);
    const totalLinkVisits = Object.values(totalLinkVisitResults[0])[0];

    // Get the total number of visits to the link per day
    const [linkVisitsByDay] = await db.query(`SELECT DATE(createdAt) date, COUNT(DISTINCT id) total FROM LinkVisits WHERE linkId = ${link.id} GROUP BY DATE(createdAt);`)

    // Get total unique IPs that have visited the link
    const [totalVisitorResults] = await db.query(`SELECT COUNT(DISTINCT requestIP) from LinkVisits WHERE linkId = ${link.id} AND (requestIP != '::1' AND requestIP IS NOT NULL);`);
    const totalUniqueVisitors = Object.values(totalVisitorResults[0])[0];
    res.status(200).json({
      data: {
        shortUrl: link.shortUrl,
        destinationUrl: link.destinationUrl,
        linkCreatedAt: link.createdAt,
        totalLinkVisits,
        totalUniqueVisitors,
        linkVisitsByDay,
      }
    });
  })
);


export default statsController;
