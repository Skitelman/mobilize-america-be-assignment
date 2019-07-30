import express from 'express';
import asyncHandler from 'express-async-handler';
import idx from 'idx';
import randomstring from 'randomstring';

const linkController = express.Router();

linkController.post(
  '/',
  asyncHandler(async (req, res) => {
    const { db } = res.locals;
    const destinationUrl = idx(req, _ => _.body.destinationUrl);

    if (!destinationUrl) {
      return res.status(400).json({
        error: {
          message: 'You must provide a destinationUrl'
        }
      })
    }

    // Check to see if short Link for the particular destination exists
    const links = await db.models.Link.findAll({
      where: {
        destinationUrl
      },
    });

    if (links.length > 0) {
      return res.status(200).json({
        data: {
          destinationUrl: links[0].destinationUrl,
          shortUrl: `http://localhost:3000/${links[0].shortUrl}`
        }
      })
    }

    // Find a random unusued string to use for the shortUrl
    let randAddress = '';
    while (randAddress.length === 0) {
      const randString = randomstring.generate({
        length: 7,
        charset: 'alphanumeric',
      });
      const links = await db.models.Link.findAll({
        where: {
          shortUrl: randString,
        }
      });
      if (links.length === 0) {
        randAddress = randString;
      }
    }

    const link = await db.models.Link.create({
      destinationUrl,
      shortUrl: randAddress,
    }) 
    const shortUrl = `http://localhost:3000/${randAddress}`;
    console.log('New link ID: ', link.id);
    return res.status(200).json({
      data: {
        destinationUrl,
        shortUrl,
      }
    })
  })
)

export default linkController;

