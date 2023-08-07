// AUTHORIZATION WINDOW

import FirebaseService from './firebase-services';

const refs = {
  logInBtn: document.querySelector('button[data-login-button]'),
  logOutBtn: document.querySelector('button[data-logout-button]'),
  authBtn: document.querySelector('button[data-modal-signup]'),
  signUpLink: document.querySelector('button[data-modal-signup-link]'),
  signInLink: document.querySelector('button[data-modal-signin-link]'),
  modal: document.querySelector('div[data-modal]'),
  closeBtn: document.querySelector('button[data-modal-close]'),
  form: document.querySelector('.auth-form'),
  input: document.querySelector('#name'),
};

// const selectors = {
//   logInBtn: 'button[data-login-button]',
//   logOutBtn: 'button[data-logout-button]',
//   authBtn: 'button[data-modal-signup]',
//   signUpLink: document.querySelector('button[data-modal-signup-link]'),
//   signInLink: document.querySelector('button[data-modal-signin-link]'),
//   modal: document.querySelector('div[data-modal]'),
//   closeBtn: document.querySelector('button[data-modal-close]'),
//   form: document.querySelector('.auth-form'),
//   input: document.querySelector('#name'),
// }

const firebaseService = new FirebaseService(refs);

firebaseService.logInBtn.addEventListener(
  'click',
  firebaseService.monitorAuthState
);
firebaseService.logOutBtn.addEventListener('click', firebaseService.onSignOut);
firebaseService.modal.addEventListener('submit', onAuthFormSubmit);
refs.closeBtn.addEventListener('click', firebaseService.closeAuthModal);
refs.signInLink.addEventListener('click', onSignInLink);
refs.signUpLink.addEventListener('click', onSignUpLink);

function onAuthFormSubmit(evt) {
  evt.preventDefault();

  let {
    elements: {
      name: { value: name },
      email: { value: email },
      password: { value: password },
    },
  } = evt.target;

  name = name || email;

  switch (evt.submitter.innerText) {
    case 'SIGN UP':
      evt.target.reset();
      firebaseService.createUser(email, password, name);
      break;
    case 'SIGN IN':
      evt.target.reset();
      firebaseService.signInUser(email, password, name);
      break;
  }
}

function onSignUpLink() {
  refs.input.hidden = false;
  refs.authBtn.textContent = 'Sign Up';
}

function onSignInLink() {
  refs.input.hidden = true;
  refs.authBtn.textContent = 'Sign In';
}
