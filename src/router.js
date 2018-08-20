const { handlerHomePage, handlerHomeData } = require('./handler/home_page');
const { handlerSignInPage, handlerSignInData } = require('./handler/sign_in');
const { handlerSignUpPage, handlerSignUpData } = require('./handler/sign_up');
const { handlerStaticFile, handlerCheckUser } = require('./handler/other_page');
const { handlerError404 } = require('./handler/error');
const { handlerAuthCheck, handlerSignOut } = require('./handler/cookie');

const router = (request, response) => {
  const endpoint = request.url;
  const method = request.method;

  // console.log(`${endpoint}\t${method}`);

  if (endpoint === '/' || endpoint === '/sign_in') {
    if (method === 'POST') handlerSignInData(request, response);
    else handlerSignInPage(request, response);
  } else if (endpoint === '/sign_up') {
    if (method === 'POST') handlerSignUpData(request, response);
    else handlerSignUpPage(request, response);
  } else if (endpoint === '/home') {
    if (method === 'POST') handlerHomeData(request, response);
    else handlerHomePage(request, response);
  } else if (endpoint.includes('public')) {
    handlerStaticFile(request, response);
  } else if (endpoint === '/check_user' && method === 'POST') {
    handlerCheckUser(request, response);
  } else if (endpoint === '/sign_out' && method === 'GET') {
    handlerSignOut(request, response);
  } else if (endpoint === '/authCheck' && method === 'GET') {
    handlerAuthCheck(request, response);
  } else {
    handlerError404(request, response);
  }
};


module.exports = router;
