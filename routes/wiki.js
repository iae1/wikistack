const express = require("express");
let router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { Page } = require("../models");

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
  const title = req.body.title;

  try {
    const page = await Page.create({
      title: title,
      content: req.body.content,
    });

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
    res.send(wikiPage(page[0]));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
