const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});


const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
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

Page.belongsTo(User, { as: 'author' })
User.hasMany(Page)

function generateSlug (title) {
  const slug = title.replace(/\s+/g, '_').replace(/\W/g, '')
  return slug;
}

Page.beforeValidate ((page) => {
  page.slug = generateSlug(page.title)
})


module.exports = { db, Page, User };

