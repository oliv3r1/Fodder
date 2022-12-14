'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoute = require('./route/userRoute');
const sneakersRoute = require('./route/sneakersRoute');
const {httpError} = require('./utils/errors');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const MemoryStore = new sessions.MemoryStore();
const app = express();
const port = 3000;


const oneDay = 1000 * 60 * 60 * 24;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(sessions({
    store: MemoryStore,
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    name: "fodder-cookie",
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
app.use(express.static('uploads'));
app.use(express.static('public/Etusivu'));

// Session middleware
app.use('/sneakers', sneakersRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).
      json({message: err.message || 'Internal server error'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));