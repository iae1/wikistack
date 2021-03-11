


const express = require('express')
let router = express.Router();
const {addPage} = require('../views')
const {Page} = require('../models')



//GET /wiki/
router.get('/', (req, res, next) => {
  res.send()
})

//post /wiki/
router.post('/', async (req, res, next) => {

  // res.send('POST WIKI')
  const title = req.body.title;
  
 
  
  
  try {
    const page = await Page.create({
      title: title,
      content: req.body.content,
    });
    
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

//GET /wiki/add/
router.get('/add', (req, res, next) => {
  res.send(addPage())
})

module.exports = router
