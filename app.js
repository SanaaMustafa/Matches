const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbconnection = require('./api/config/config');

dbconnection();

const uerRoutes = require('./api/routes/user');
const leagueRoutes = require('./api/routes/league');
<<<<<<< HEAD
const MatchRoutes = require('./api/routes/match');

=======
const teamRoutes = require('./api/routes/team');
>>>>>>> 48e01fb562ff5442dd638f350ce9ee05c1a05fc1

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.static("upload"));

app.use('/', uerRoutes);
<<<<<<< HEAD
app.use('/', leagueRoutes);
app.use('/', MatchRoutes);

=======
app.use('/', leagueRoutes)
app.use('/', teamRoutes);
>>>>>>> 48e01fb562ff5442dd638f350ce9ee05c1a05fc1
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
