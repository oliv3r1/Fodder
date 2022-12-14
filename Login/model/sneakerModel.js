'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllSneakers = async () => {
	const [sneakers] = await promisePool.execute("SELECT * FROM shoes INNER JOIN malli ON shoes.malli = malli.malli_id;");
	let mapped =sneakers.map(e => ({ hinta: e.hinta, koko: e.koko, nimi: e.nimi, User: e.user, kuva: e.kuva })); 
	console.log(mapped);
	return mapped;
}

const getMerkki = async (name) => {
	console.log("name", name);
	const [merkki] = await promisePool.execute("SELECT * from merkki where nimi = ? LIMIT 1;", [name]);
	if(!merkki.length > 0) return false;
	return merkki[0];
}

const getMalli = async (name) => {
	if(!name) return false;
	const [malli] = await promisePool.execute("SELECT * from malli where nimi = ? LIMIT 1;", [name]);
	if(!malli.length > 0) return false;
	return malli[0];
}

const createShoe = async (shoeData, user) => {
	const merkki = await getMerkki(shoeData.merkki);
	if(!merkki) throw new Error("Merkki puuttuu")
	const malli = await getMalli(shoeData.malli);
	if(!malli) throw new Error("Malli puuttuu")
	const malliNimi = malli.nimi.toLowerCase().replaceAll(" ", "-") + ".jpeg";

	const [shoe] = await promisePool.execute("INSERT INTO `shoes` (`shoes_id`, `malli`, `hinta`, `koko`, `user`, `kuva`) VALUES (NULL, ?, ?, ?, ?, ?);", [malli.malli_id, shoeData.hinta, shoeData.koko, 1, malliNimi]);
	return shoe;
}


module.exports = {
	getAllSneakers,
	createShoe
};