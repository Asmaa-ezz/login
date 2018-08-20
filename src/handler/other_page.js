const path = require('path');
const { handlerError500 } = require('./error');
const { readFile } = require('./function');
const { getDataOfUser } = require('../quiers/get_data');

const handlerStaticFile = (request, response) => {
  const endpoint = request.url;
  const extension = endpoint.split('.')[1];
  const contentType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    ico: 'image/x-icon',
  };

  readFile(path.join(__dirname, '..', '..', endpoint))
    .then((res) => {
      response.writeHead(200, `Content-Type:${contentType[extension]}`);
      response.end(res);
    })
    .catch(err => handlerError500(request, response));
};


const handlerCheckUser = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    const data = JSON.parse(allData);
    getDataOfUser(data.username)
      .then((result) => {
        response.end(JSON.stringify({ result: 'username already exists' }));
      })
      .catch((err) => {
        if (err.message === 'username not found') {
          response.end(JSON.stringify({ err: 'Pass' }));
        } else {
          response.end(err.message);
        }
      });
  });
};


module.exports = {
  handlerStaticFile, handlerCheckUser,
};
