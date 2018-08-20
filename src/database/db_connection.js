const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

let DB_URL = '';

if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL;
} else {
  DB_URL = process.env.DB_URL;
}

if (!DB_URL) throw new Error('Can not found the DB URL !');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  user: username,
  password,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTIONS || 2,
  ssl: process.env.host !== 'localhost',
};

module.exports = new Pool(options);
