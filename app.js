const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

app.engine('hbs', exphbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

// Routes imports
const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRoutes);

// 404 Error
app.use('/', (req, res, next) => {
  res.status(404).render('404');
});

app.listen(3000);