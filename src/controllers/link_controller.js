import express from 'express';
import idx from 'idx';
import randomstring from 'randomstring';

const linkController = express.Router();

linkController.post(
  '/',
  (req, res) => {
    const destinationUrl = idx(req, _ => _.body.destinationUrl);
    const shortLink = randomstring.generate({
      length: 7,
      charset: 'alphanumeric',
    });
    res.status(200).json({
      data: {
        destinationUrl,
        shortLink: `http://localhost:3000/${shortLink}`,
      }
    })
  }
)

export default linkController;

