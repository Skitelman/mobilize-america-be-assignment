import express from 'express';
import idx from 'idx';
import asyncHandler from 'express-async-handler';

import { getLink } from '../middleware/getLink';

const redirectController = express.Router();

redirectController.get(
  '/:shortUrl',
  getLink,
  asyncHandler(async (req, res) => {
    const { db, link } = res.locals;
    await db.models.LinkVisit.create({
      linkId: link.id,
      requestIP: req.ip
    });

    const destinationUrl = link.destinationUrl;
    res.redirect(destinationUrl);  
  })
)

export default redirectController;
