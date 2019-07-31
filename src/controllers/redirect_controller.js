import express from 'express';
import idx from 'idx';
import asyncHandler from 'express-async-handler';

const redirectController = express.Router();

redirectController.get(
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
    await db.models.LinkVisit.create({
      linkId: link.id,
      requestIP: req.ip
    });

    const destinationUrl = link.destinationUrl;
    res.redirect(destinationUrl);  
  })
)

export default redirectController;
