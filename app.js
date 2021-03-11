const express = require('express')
const app = express();
const morgan = require('morgan')
const templateTag = require('html-template-tag')
const viewFuncs = require('./views/index')
const layout = require('./views/layout')

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(express.json()); // raw json req.body
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded req.body

app.get('/', (req, res, next) => {
  
  res.send(layout('Gabe'))
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000');
})
