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
    const destinationUrl = links[0].destinationUrl;
    res.redirect(destinationUrl);  
  })
)

export default redirectController;
