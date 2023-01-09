"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();
// ("SELECT * FROM shoes INNER JOIN malli ON shoes.malli = malli.malli_id INNER JOIN user ON shoes.user = user.ID;");
const getAllSneakers = async () => {
  const [sneakers] = await promisePool.execute(
    "SELECT * FROM user INNER JOIN shoes ON shoes.user = user.ID INNER JOIN malli ON shoes.malli = malli.malli_id ORDER BY ASC shoes.id; "
  );
  let mapped = sneakers.map((e) => ({
    hinta: e.hinta,
    koko: e.koko,
    nimi: e.nimi,
    Email: e.Email,
    kuva: e.kuva,
  }));
  console.log(mapped);
  return mapped;
};

const getMerkki = async (name) => {
  if (!name) return false;
  const [merkki] = await promisePool.execute(
    "SELECT * from merkki where nimi = ? LIMIT 1;",
    [name]
  );
  if (!merkki.length > 0) return false;
  return merkki[0];
};

const getMalli = async (name) => {
  if (!name) return false;
  const [malli] = await promisePool.execute(
    "SELECT * from malli where nimi = ? LIMIT 1;",
    [name]
  );
  if (!malli.length > 0) return false;
  return malli[0];
};

const getUserByEmail = async (email) => {
  if (!email) return false;
  const [kayttaja] = await promisePool.execute(
    "SELECT * from user where Email = ? LIMIT 1;",
    [email]
  );
  if (!kayttaja.length > 0) return false;
  return kayttaja[0];
};

const createShoe = async (shoeData) => {
  const merkki = await getMerkki(shoeData.merkki);
  if (!merkki) throw new Error("Merkki puuttuu");
  const malli = await getMalli(shoeData.malli);
  if (!malli) throw new Error("Malli puuttuu");
  const kayttaja = await getUserByEmail(shoeData.user);
  if (!kayttaja) throw new Error("käyttäjä puuttuu");
  const malliNimi = malli.nimi.toLowerCase().replaceAll(" ", "-") + ".jpeg";
  const kuva = "shoe1.jpeg"; //TODO kuvan lisäys
  const [shoe] = await promisePool.execute(
    "INSERT INTO `shoes` (`shoes_id`, `malli`, `hinta`, `koko`, `user`, `kuva`) VALUES (NULL, ?, ?, ?, ?, ?);",
    [malli.malli_id, shoeData.hinta, shoeData.koko, kayttaja.ID, malliNimi]
  );
  return shoe;
};

module.exports = {
  getAllSneakers,
  createShoe,
};
