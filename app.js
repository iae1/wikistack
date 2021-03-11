const express = require("express");
const app = express();
const morgan = require("morgan");
const templateTag = require("html-template-tag");
const viewFuncs = require("./views/index");
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const wikiRouter = require('./routes/wiki')
const usersRouter = require('./routes/users')

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.json()); // raw json req.body
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded req.body

app.use('/wiki', wikiRouter)
app.use('/users', usersRouter)

app.get("/", (req, res, next) => {
  res.redirect('wiki');
});

const init = async () => {
  await db.sync({ force: true });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log("Listening at http://localhost:3000");
  });
};

init();
