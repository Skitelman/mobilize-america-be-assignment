import express from 'express';
import idx from 'idx';

const redirectController = express.Router();

redirectController.get(
  '/:shortLink',
  (req, res) => {
    const shortLink = idx(req, _ => _.params.shortLink); 
    console.log(`You say you want to go to ${req.params.shortLink}`);
    res.redirect('https://www.nytimes.com');  
  }
)

export default redirectController;
