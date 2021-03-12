const express = require("express");
let router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");

//GET /wiki/
router.get("/", async (req, res, next) => {
  try {
    let pages = await Page.findAll();
    console.log("PAGES OBJ", pages);
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

//post /wiki/
router.post("/", async (req, res, next) => {
  // res.send('POST WIKI')
  try {
    
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    
    const user = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })
    // console.log(user)
    
    await page.setAuthor(user[0])
    console.log(page.authorId)

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

//GET /wiki/add/
router.get("/add", (req, res, next) => {
  res.send(addPage());
});

// GET /wiki/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const slug = req.params.slug;
    
    const page = await Page.findAll({
      where: {
        slug: slug,
      },
    });
    console.log(page)
    const author = await User.findAll({
      where : {
        id: page.authorId[0].dataValues.id
      }
    });
  
    res.send(wikiPage(page[0], author[0]));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
