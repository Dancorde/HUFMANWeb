const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Routes imports
const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', indexRoutes);

// 404 Error
app.use('/', (req, res, next) => {
  res.status(404).send("<h1>Page not Found</h1>");
});

app.listen(3000);