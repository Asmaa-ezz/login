const path = require('path');
const { handlerError500 } = require('./error');
const { readFile, authChekCookie } = require('./function');
const { getUsername } = require('../quiers/get_data');

const handlerHomePage = (request, response) => {
  // authChekCookie(request)
  //   .then((res) => {
  readFile(path.join(__dirname, '..', '..', 'public', 'home.html'))
    .then((res) => {
      response.end(res);
    })
    .catch(err => handlerError500(request, response));
  // })
  // .catch(err => response.end(err.message));
};

const handlerHomeData = (request, response) => {
  // let allData = '';
  // request.on('data', (chunk) => {
  //     allData += chunk;
  // });
  //
  // request.on('end', () => {
  //     const data = JSON.parse(allData);
  // }


};

module.exports = { handlerHomePage, handlerHomeData };
