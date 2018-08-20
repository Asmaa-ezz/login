const fs = require('fs');
const bcrypt = require('bcrypt');

const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');

const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if (err) reject(new TypeError('Error in Path'));
    else resolve(data);
  });
});


const hashPassword = (password, callback) => bcrypt.genSalt(10, (err, salt) => {
  if (err) return callback(new TypeError('no hash Pass'));
  bcrypt.hash(password, salt, callback);
});

const comparePasswords = (password, hashPass, callback) => {
  bcrypt.compare(password, hashPass, callback);
};

const createCookie = data => sign(data, process.env.SECRET);

const authChekCookie = request => new Promise((resolve, reject) => {
  if (!request.headers.cookie) return reject(new TypeError('no cookie'));

  const { jwt } = parse(request.headers.cookie);
  if (!jwt) return reject(new TypeError('error of cookie'));

  verify(jwt, process.env.SECRET, (err, jwt) => {
    if (err) return reject(new TypeError('cookie is the not same in data'));
    resolve(JSON.stringify(jwt.userID));
  });
});

const isEmpty = element => element.length === 0;


module.exports = {
  readFile, hashPassword, comparePasswords, createCookie, authChekCookie, isEmpty
};
