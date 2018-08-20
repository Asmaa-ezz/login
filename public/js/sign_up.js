const select = id => document.getElementById(id);

const isValid = (element, regex) => regex.test(element.value);

const isEmpty = element => element.value.trim().toString().length === 0;

const isEqule = (element1, element2) => element1.value === element2.value;

const username = select('username');
const userError = select('userError');
const password = select('password');
const PassError = select('PassError');
const confirmPass = select('confirmPass');
const confirmPassError = select('confirmPassError');
const button = select('button');
const link = select('signin');


username.addEventListener('input', (e) => {
  e.preventDefault();

  const regex = /[a-zA-Z0-9\-]{3,}/;
  if (!isEmpty(username) && isValid(username, regex)) {
    const object = { username: username.value };

    fetch(object, 'POST', '/check_user')
      .then((res) => {
        if (res.toString() === 'username already exists') {
          userError.textContent = res;
        }
      })
      .catch(err => userError.textContent = '');
  } else {
    userError.textContent = 'Error';
  }
});

const powerRate = (password, PassError) => {
  const value = password.value;
  const digit = /([\d])*/;
  const digitAndLower = /[a-z]+/;
  const digitALowerAUpper = /[A-Z]+/;
  const minimumLength = /^.{5,}$/;
  const symbol = /[\W+]/;

  if (!isEmpty(password)) {
    if (!minimumLength.test(value)) {
      PassError.textContent = 'at least 5 digit';
    } else if (digitALowerAUpper.test(value) || symbol.test(value)) {
      PassError.textContent = 'strong';
    } else if (digitAndLower.test(value)) {
      PassError.textContent = 'mediate';
    } else if (digit.test(value)) {
      PassError.textContent = 'Weak';
    }
  } else {
    PassError.textContent = 'Error';
  }
};

password.addEventListener('input', (e) => {
  e.preventDefault();
  powerRate(password, PassError);
});

confirmPass.addEventListener('input', (e) => {
  e.preventDefault();
  if (!isEmpty(confirmPass) && isEqule(confirmPass, password)) {
    confirmPassError.textContent = '';
  } else {
    confirmPassError.textContent = 'Error';
  }
});

button.addEventListener('click', () => {
  if (isEmpty(username) && isEmpty(password) && isEmpty(confirmPass)) {
    alert('Fill the filed');
  } else if (userError.textContent === '' && (PassError.textContent === 'mediate' || PassError.textContent === 'strong') && confirmPassError.textContent === '') {
    const object = {
      username: username.value,
      password: password.value,
    };

    fetch(object, 'POST', '/sign_up')
      .then(res => window.location = '/sign_in')
      .catch(err => alert(`Error :${err.message}`));
  } else alert('correct the filed');
});

link.addEventListener('click', () => {
  window.location = '/sign_in';
});
