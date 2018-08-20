const path = require('path');
const { handlerError500 } = require('./error');
const {
  readFile, comparePasswords, createCookie, isEmpty,
} = require('./function');
const { getDataOfUser } = require('../quiers/get_data');


const handlerSignInPage = (request, response) => {
  readFile(path.join(__dirname, '..', '..', 'public', 'sign_in.html'))
    .then(res => response.end(res))
    .catch(err => handlerError500(request, response));
};

const handlerSignInData = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });

  request.on('end', () => {
    const data = JSON.parse(allData);
    if (!isEmpty(data.username) && !isEmpty(data.password)) {
      getDataOfUser(data.username)
        .then((res) => {
          comparePasswords(data.password, res[0].password, (err, correct) => {
            if (err) return response.end(JSON.stringify({ err: err.message }));
            if (correct) {
              const cookie = createCookie({ userID: res[0].id });
              response.writeHead(200, { 'Set-Cookie': `jwt=${cookie}; HttpOnly` });
              response.end(JSON.stringify({ result: 'Pass' }));
            }response.end(JSON.stringify({ err: 'Password not true' }));
          });
        })
        .catch(err => response.end(JSON.stringify({ err: err.message })));
    } else {
      response.end(JSON.stringify({ err: 'Error in data' }));
    }
  });
};

module.exports = { handlerSignInPage, handlerSignInData };
