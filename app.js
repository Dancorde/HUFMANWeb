const dot = require("dotenv").config();
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
  extname: 'hbs',
  helpers: require('./config/handlebars-helpers')
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

// Routes imports
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const usersRoutes = require("./routes/users");
const phasesRoutes = require("./routes/phases");
const missionsRoutes = require("./routes/missions");
const componentsRoutes = require('./routes/components');
const compVantRoutes = require('./routes/compvants');
const vantRoutes = require('./routes/vants');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
      expiration: 1 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
    }),
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

// Routes
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", usersRoutes);
app.use("/phases", phasesRoutes);
app.use("/missions", missionsRoutes);
app.use('/components', componentsRoutes);
app.use('/compvants', compVantRoutes);
app.use('/vants', vantRoutes);

// 404 Error
app.use('/', (req, res, next) => {
  res.status(404).render("errors/404", { 
    pageTitle: "Page not Found",
    isAuthenticated: req.session.isLoggedIn
  });
});


sequelize
  .sync({force: false})
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });