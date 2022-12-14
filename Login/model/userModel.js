"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT * from user;`);
    return rows;
  } catch (e) {
    console.error("getAllUsers", e.message);
    next(httpError("Database error", 500));
  }
};

const getUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT User, Password FROM user
                                              WHERE User = ?;`,
      [userId]
    );
    return rows;
  } catch (e) {
    console.error("getUser", e.message);
    // next(httpError('Database error', 500));
  }
};

const checkUserCredentials = async (username, password) => {
  const [validUser] = await promisePool.execute(
    `SELECT User, Password from user where User = ? AND Password = ? LIMIT 1;`,
    [username, password]
  );
  console.log(validUser);
  if (validUser.length > 0) return true;
  return false;
};

const getInfo = async (username) => {
  const [user] = await promisePool.execute(
    `SELECT * from user where User = ? LIMIT 1;`,
    [username]
  );
  return user[0];
};

const addUser = async (data) => {
  if (Object.values(data).some((e) => e === undefined))
    return next(httpError("nope", 500));
  try {
    console.log(data, "data in addUser");
    const [rows] = await promisePool.execute(
      `INSERT INTO user (User, Email, Etunimi, Sukunimi, Password) VALUES (?, ?, ?, ?, ?);`,
      data
    );
    return rows;
  } catch (e) {
    console.error("addUser", e.message);
    next(httpError("Database error", 500));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  checkUserCredentials,
  getInfo,
};
