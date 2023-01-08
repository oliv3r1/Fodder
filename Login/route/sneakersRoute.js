const express = require("express");
const {
  get_all_sneakers,
  add_shoe,
} = require("../controller/sneakerController");
const sneakers = express.Router();
const pool = require("../database/db");
const promisePool = pool.promise();
const { object, string, number, date, InferType } = require("yup");

sneakers.get("./", get_all_sneakers);

sneakers.post("./", add_shoe);

// sneakers.put('/', (req, res) => {
//   res.send('From this endpoint you can edit users.');
// });

// router.delete('/', (req, res) => {
//   res.send('From this endpoint you can delete users.');
// });

module.exports = sneakers;
