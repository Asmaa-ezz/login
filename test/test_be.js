// const test = require('tape');
// const router = require('../src/router');
//
// const endpoints = [
//   { url: '/', status_code: 200, body: 'view = \'sing_in\'' },
//   { url: '/home', status_code: 200, body: 'view = \'home\'' }
//
// ];
//
// endpoints.forEach((endpoint) => {
//   test(`GET :: ${endpoint.url} :: returns ${endpoint.status_code}`, (t) => {
//     t.plan(2);
//
//     router({ url: endpoint.url }, {
//       writeHead: (status, content) => {
//         t.equal(status, endpoint.status_code);
//       },
//       end: (body) => {
//         t.ok(endpoint.body ? body.includes(endpoint.body) : body);
//       },
//     });
//   });
// });
//
// test.onFinish(() => process.exit(0));
