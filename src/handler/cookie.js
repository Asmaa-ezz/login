const { authChekCookie } = require('./function');
const { getUsername } = require('../quiers/get_data');

const handlerAuthCheck = (request, response) => {
  authChekCookie(request)
    .then((res) => {
      getUsername(res)
        .then((result) => {
          response.end(JSON.stringify({ result: result[0].username }));
        })
        .catch(err => response.end({ err: err.message }));
    })
    .catch((err) => {
      response.end(JSON.stringify({ err: err.message }));
    });
};

const handlerSignOut = (request, response) => {
  response.writeHead(200, { 'Set-Cookie': 'jwt=0; Max-Age=0' });
  response.end(JSON.stringify({ result: 'Pass' }));
};

module.exports = { handlerAuthCheck, handlerSignOut };
