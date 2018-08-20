const dbConnection = require('../database/db_connection');

const getDataOfUser = (username) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username = $1;',
    values: [username],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, res) => {
      if (err) return reject(new TypeError('Error in DB'));
      if (res.rows.length === 0) return reject(new TypeError('username not found'));
      resolve(res.rows);
    });
  });
};

const getUsername = (id) => {
  const sql = {
    text: 'SELECT username FROM users WHERE id =$1',
    values: [id],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, res) => {
      if (err) return reject(new TypeError('Error in DB'));
      resolve(res.rows);
    });
  });
};


module.exports = { getDataOfUser, getUsername };
