import express from 'express';
import idx from 'idx';
import url from 'url';
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

    const destinationUrl = url.parse(link.destinationUrl);
    let destination;
    if (destinationUrl.protocol) {
      destination = destinationUrl;
    } else {
      destination = `http://${destinationUrl.href}`
    }
    res.redirect(destination);
  })
)

export default redirectController;
