const select = id => document.getElementById(id);

const isValid = (element, regex) => regex.test(element.value);

const isEmpty = element => element.value.trim().toString().length === 0;


const username = select('username');
const userError = select('userError');
const password = select('password');
const passError = select('passError');
const button = select('button');
const link = select('signup');

username.addEventListener('input', (e) => {
  e.preventDefault();
  const regex = /[a-zA-Z0-9\-]{3,}/;
  if (!isEmpty(username) && isValid(username, regex)) {
    userError.textContent = '';
  } else {
    userError.textContent = 'Error';
  }
});

password.addEventListener('input', (e) => {
  e.preventDefault();
  if (!isEmpty(password)) {
    passError.textContent = '';
  } else {
    passError.textContent = 'Error';
  }
});


button.addEventListener('click', () => {
  if (isEmpty(username) && isEmpty(password)) {
    alert('Fill the filed');
  } else if (userError.textContent === '' && passError.textContent === '') {
    const object = {
      username: username.value,
      password: password.value,
    };

    fetch(object, 'POST', '/sign_in')
      .then(res => window.location = '/home')
      .catch((err) => {
        if (err.message === 'Password not true') {
          passError.textContent = err.message;
        } else if (err.message === 'username not found') {
          userError.textContent = err.message;
        } else {
          alert(`Error :${err.message}`);
        }
      });
  } else alert('correct the filed');
});

link.addEventListener('click', () => {
  window.location = '/sign_up';
});
