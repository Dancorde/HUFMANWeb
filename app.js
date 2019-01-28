const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');

const app = express();

const sequelize = require('./config/database');

app.engine('hbs', exphbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

// Routes imports
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const usersRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    store: new SequelizeStore({
      db: sequelize
    }),
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

// Routes
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use('/users', usersRoutes);

// 404 Error
app.use('/', (req, res, next) => {
  res.status(404).render("errors/404", { 
    pageTitle: "Page not Found",
    isAuthenticated: req.session.isLoggedIn
  });
});


sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(errr => {
    console.log(err);
  });