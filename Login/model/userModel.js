'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT * from user;`);
    return rows;
  } catch (e) {
    console.error('getAllUsers', e.message);
    next(httpError('Database error', 500));
  }
};

const getUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT User, Password FROM user
                                              WHERE User = ?;`, [userId]);
    return rows;
  } catch (e) {
    console.error('getUser', e.message);
   // next(httpError('Database error', 500));
  }
};


const addUser = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO user (User, Email, Etunimi, Sukunimi, Password) VALUES (?, ?, ?, ?, ?);`, data);
    return rows;
  } catch (e) {
    console.error('addUser', e.message);
    next(httpError('Database error', 500));
  }
}


module.exports = {
  getAllUsers,
  getUser,
  addUser,
};