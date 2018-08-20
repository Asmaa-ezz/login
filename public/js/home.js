const select = id => document.getElementById(id);

const link = select('signout');
const username = select('username');

window.onload = () => {
  fetch(null, 'GET', '/authCheck')
    .then(res => username.textContent = res)
    .catch((err) => {
      if (err.message === 'no cookie') {
        window.location = '/sign_in';
      } else if (err.message === 'cookie is the not same in data') {
        fetch(null, 'GET', '/sign_out')
          .then(res => window.location = '/sign_in')
          .catch(err => console.log(err));
        window.location = '/sign_in';
      }
    });
};


link.addEventListener('click', () => {
  fetch(null, 'GET', '/sign_out')
    .then(res => window.location = '/sign_in')
    .catch(err => console.log(err));
});
