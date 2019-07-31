import idx from 'idx';
import asyncHandler from 'express-async-handler';

export const getLink = async (req, res, next) => {
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
    const url = `${req.protocol}://${req.hostname}/${shortUrl}`
    res.status(400).json({
      error: {
        message: `There is no short link with the url: ${url}`
      }
    })
  }
  res.locals.link = link;
  next();
};
