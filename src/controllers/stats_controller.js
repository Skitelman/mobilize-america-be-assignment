import express from 'express';
import asyncHandler from 'express-async-handler';
import idx from 'idx';

const statsController = express.Router();

statsController.get(
  '/:shortUrl',
  asyncHandler(async (req, res) => {
    const { db } = res.locals;
    const shortUrl = idx(req, _ => _.params.shortUrl);
    const links = await db.models.Link.findAll({
      where: {
        shortUrl
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    const link = links[0];
    if (!link) {
      res.status(400).json({
        error: {
          message: `There is no short link with the url: http://localhost:3000/${shortUrl}`
        }
      })
    }

    // Get the total number of visits to the link
    const [totalLinkVisitResults] = await db.query(`SELECT COUNT(*) FROM LinkVisits WHERE linkId = ${link.id};`);
    const totalLinkVisits = Object.values(totalLinkVisitResults[0])[0];

    // Get the total number of visits to the link per day
    const [linkVisitsByDay] = await db.query(`SELECT DATE(createdAt) date, COUNT(DISTINCT id) total FROM LinkVisits WHERE linkId = ${link.id} GROUP BY DATE(createdAt);`)
    res.status(200).json({
      data: {
        shortUrl: link.shortUrl,
        destinationUrl: link.destinationUrl,
        linkCreatedAt: link.createdAt,
        totalLinkVisits,
        linkVisitsByDay
      }
    })

  })
)

export default statsController;
