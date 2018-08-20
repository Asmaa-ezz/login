const path = require('path');
const { readFile } = require('./function');


const handlerError404 = (request, response) => {
  readFile(path.join(__dirname, '..', '..', 'public', 'error404.html'))
    .then(res => response.end(res))
    .catch(err => handlerError500(request, response));
};

const handlerError500 = (request, response) => {
  readFile(path.join(__dirname, '..', '..', 'public', 'error500.html'))
    .then(res => response.end(res))
    .catch(err => response.end(err.message));
};

module.exports = { handlerError404, handlerError500 };
