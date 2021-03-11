const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    // defaultValue: (this.title) => {
    //   let urlTitle = this.title;
    //   return urlTitle.split(" ").join("-");
    // },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    defaultValue: "closed",
  },
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
});

// const connect = async () => {
//   await db.sync();
// };

// connect();

module.exports = { db, Page, User };
