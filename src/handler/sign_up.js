const path = require('path');
const { handlerError500 } = require('./error');
const { readFile, hashPassword, isEmpty } = require('./function');
const addNewUser = require('../quiers/post_data');


const handlerSignUpPage = (request, response) => {
  readFile(path.join(__dirname, '..', '..', 'public', 'sign_up.html'))
    .then((res) => {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end(res);
    })
    .catch(err => handlerError500(request, response));
};

const handlerSignUpData = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });

  request.on('end', () => {
    const data = JSON.parse(allData);

    if (!isEmpty(data.username) && !isEmpty(data.password)) {
      hashPassword(data.password, (err, hashPass) => {
        response.writeHead(200, { 'content-type': 'application/javascript' });
        if (err) return handlerError500(request, response);

        addNewUser(data.username, hashPass)
          .then(res => response.end(JSON.stringify({ result: 'pass' })))
          .catch((err) => {
            response.end(JSON.stringify({ err: err.message }));
          });
      });
      response.end(JSON.stringify({ result: 'Pass' }));
    } else {
      response.end(JSON.stringify({ err: 'Error in data' }));
    }
  });
};

module.exports = { handlerSignUpPage, handlerSignUpData };
