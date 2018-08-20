const dbConnection = require('../database/db_connection');

const addNewUser = (username, password) => {
  const sql = {
    text: 'INSERT INTO users(username,password) values ($1,$2);',
    values: [username, password],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, res) => {
      if (err) return reject(new TypeError('Error in DB'));
      resolve(res.rows);
    });
  });
};


module.exports = addNewUser;
