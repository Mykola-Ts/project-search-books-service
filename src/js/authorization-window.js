// AUTHORIZATION WINDOW

import FirebaseService from './firebase-services';

const refs = {
  logInBtn: document.querySelector('button[data-login-button]'),
  logOutBtn: document.querySelector('button[data-logout-button]'),
  authBtn: document.querySelector('button[data-modal-signup]'),
  form: document.querySelector('.auth-form'),
  input: document.querySelector('#name'),
};

const selectors = {
  signUpLink: document.querySelector('button[data-modal-signup-link]'),
  signInLink: document.querySelector('button[data-modal-signin-link]'),
  modal: document.querySelector('div[data-modal-overlay]'),
  closeBtn: document.querySelector('button[data-modal-close]'),
};

const firebaseService = new FirebaseService(refs);

firebaseService.logInBtn.addEventListener('click', onSignupClick);
firebaseService.logOutBtn.addEventListener('click', firebaseService.onSignOut);
selectors.modal.addEventListener('submit', onAuthFormSubmit);

function onSignupClick() {
  if (firebaseService.isUserAuthorized()) {
    firebaseService.logOutBtn.classList.toggle('is-hidden');
    closeAuthModal();
  } else {
    showAuthModal();
  }
}

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

function showAuthModal() {
  selectors.signUpLink.addEventListener('click', onSignUpLink);
  selectors.signInLink.addEventListener('click', onSignInLink);
  selectors.closeBtn.addEventListener('click', closeAuthModal);
  selectors.modal.classList.remove('is-hidden');
}

function closeAuthModal() {
  selectors.signUpLink.removeEventListener('click', onSignUpLink);
  selectors.signInLink.removeEventListener('click', onSignInLink);
  selectors.closeBtn.removeEventListener('click', closeAuthModal);
  selectors.modal.classList.add('is-hidden');
}

function onSignUpLink() {
  refs.input.hidden = false;
  refs.authBtn.textContent = 'Sign Up';
}

function onSignInLink() {
  refs.input.hidden = true;
  refs.authBtn.textContent = 'Sign In';
}

export { onSignUpLink, onSignInLink, showAuthModal, closeAuthModal };
