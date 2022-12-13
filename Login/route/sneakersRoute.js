const express = require('express');
const {user_list_get, user_get, user_post} = require('../controller/userController');
const sneakers = express.Router();
const pool = require('../database/db');
const promisePool = pool.promise();
const { object, string, number, date, InferType } = require('yup');

sneakers.get('/', async (req, res) => {
	const [data] = promisePool.execute("SELECT * FROM shoes");
});

let sneakerSchema = object({
  malli: number().required(),
  hinta: number().required(),
  koko: number().required(),
	userId: number().required(),
	kuva: string().required(),
});

sneakers.post('/', async (req, res) => {
	const body = req.body;
	if(!sneakerSchema.isValidSync(body)) {
		return res.status(400).json({ message: "Vituiks man"})
	}
	let [created] = await promisePool.execute(`INSERT INTO shoes (shoes_id, malli, hinta, koko, user, kuva) VALUES (NULL, '${body.malli}', '${body.hinta}', '${body.koko}', '${body.userId}', '');`)
	return res.status(201).json({ message: "Created" })
});

// sneakers.put('/', (req, res) => {
//   res.send('From this endpoint you can edit users.');
// });

// router.delete('/', (req, res) => {
//   res.send('From this endpoint you can delete users.');
// });

module.exports = sneakers;