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
    const customUrl = idx(req, _ => _.body.customUrl);

    // Return an error message if the user fails to provide a destinationUrl
    if (!destinationUrl) {
      return res.status(400).json({
        error: {
          message: 'You must provide a destinationUrl'
        }
      })
    }

    if(customUrl && customUrl.length > 20) {
      return res.status(400).json({
        error: {
          message: 'Your custom link must be 20 characters or fewer'
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
          shortUrl: `${req.protocol}://${req.hostname}/${links[0].shortUrl}`
        }
      })
    }

    
    let shortAddress = '';
    if (customUrl) {
      shortAddress = customUrl;
    } else {
      // Find a random unusued string to use for the shortUrl
      while (shortAddress.length === 0) {
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
          shortAddress = randString;
        }
      }
    }

    const link = await db.models.Link.create({
      destinationUrl,
      shortUrl: shortAddress,
    }) 
    const shortUrl = `${req.protocol}://${req.hostname}/${shortAddress}`;
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

