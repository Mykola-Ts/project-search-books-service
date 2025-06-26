import FirebaseService from './firebase-services';
import LocalStorageService from './localstorage-services';

const LOCAL_USER_KEY = 'currentUser';
const LOCAL_THEME_KEY = 'currentTheme';
const LOCAL_DATA_KEY = 'shoppingList';

const selectors = {
  logInBtn: document.querySelector('button[data-login-button]'),
  logOutBtn: document.querySelector('button[data-logout-button]'),
  signUpLink: document.querySelector('button[data-modal-signup-link]'),
  signInLink: document.querySelector('button[data-modal-signin-link]'),
  modal: document.querySelector('div[data-modal-overlay]'),
  closeBtn: document.querySelector('button[data-modal-close]'),
  modalDiv: document.querySelector('.auth-form'),
  input: document.querySelector('#name'),
  authBtn: document.querySelector('button[data-modal-signup]'),
  logInBtnMobMenu: document.querySelector('.mobile-menu-sign-up-btn'),
  logOutBtnMobMenu: document.querySelector('.mobile-menu-log-out'),
};

const firebaseService = new FirebaseService();
const localStorageService = new LocalStorageService();

selectors.logInBtn.addEventListener('click', onSignupClick);
selectors.logOutBtn.addEventListener('click', firebaseService.onSignOut);
selectors.modal.addEventListener('submit', onAuthFormSubmit);

function onSignupClick() {
  if (isUserAuthorized()) {
    selectors.logOutBtn.classList.toggle('is-hidden');

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
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  selectors.signUpLink.removeEventListener('click', onSignUpLink);
  selectors.signInLink.removeEventListener('click', onSignInLink);
  selectors.closeBtn.removeEventListener('click', closeAuthModal);
  selectors.modal.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
}

function onSignUpLink() {
  selectors.input.hidden = false;
  selectors.authBtn.textContent = 'Sign Up';
}

function onSignInLink() {
  selectors.input.hidden = true;
  selectors.authBtn.textContent = 'Sign In';
}

function isUserAuthorized() {
  return localStorageService.loadFromLocalStorage(LOCAL_USER_KEY)
    ? true
    : false;
}

function userLoggedInBtnStyle(name) {
  selectors.logInBtn.classList.replace('sign-up', 'user-in');
  selectors.logInBtnMobMenu.classList.replace('sign-up', 'user-in');
  selectors.logInBtn.children[1].textContent = name;
  selectors.logInBtnMobMenu.children[1].textContent = name;
}

function userLoggedOutBtnStyle() {
  selectors.logOutBtn.classList.add('is-hidden');
  selectors.logInBtn.classList.replace('user-in', 'sign-up');
  selectors.logInBtnMobMenu.classList.replace('user-in', 'sign-up');
  selectors.logInBtn.children[1].textContent = 'Sign up';
  selectors.logInBtnMobMenu.children[1].textContent = 'Sign up';

  localStorageService.removeFromLocalStorage(LOCAL_DATA_KEY);

  window.location.reload();
}

function saveNewTheme() {
  const currentTheme = localStorage.getItem(LOCAL_THEME_KEY);
  const themeData = { currentTheme };

  firebaseService.addDataToDb('currentTheme', 'themes', themeData);
}

export {
  closeAuthModal,
  userLoggedInBtnStyle,
  userLoggedOutBtnStyle,
  saveNewTheme,
  onSignupClick,
  isUserAuthorized,
  showAuthModal,
  firebaseService,
};
