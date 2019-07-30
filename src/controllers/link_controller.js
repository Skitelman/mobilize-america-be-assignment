import express from 'express';
import asyncHandler from 'express-async-handler';
import idx from 'idx';
import randomstring from 'randomstring';

const linkController = express.Router();

linkController.post(
  '/',
  asyncHandler(async(req, res) => {
    const { db } = res.locals;
    const destinationUrl = idx(req, _ => _.body.destinationUrl);
    const shortLink = randomstring.generate({
      length: 7,
      charset: 'alphanumeric',
    });
    const shortUrl = `http://localhost:3000/${shortLink}`;
    const link = await db.models.Link.create({
      destinationUrl,
      shortUrl,
    }) 
    console.log('New link ID: ', link.id);
    res.status(200).json({
      data: {
        destinationUrl,
        shortLink: `http://localhost:3000/${shortLink}`,
      }
    })
  })
)

export default linkController;

