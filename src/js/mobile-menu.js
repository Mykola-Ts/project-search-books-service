// MOBILE MENU

import { isUserAuthorized } from './authorization-window';
import { showAuthModal } from './authorization-window';
import { closeAuthModal } from './authorization-window';
import { firebaseService } from './authorization-window';

const selectors = {
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileMenuBtn: document.querySelector('.js-btn-menu'),
  openMobMenuBtn: document.querySelector('.menu-open'),
  closeMobMenuBtn: document.querySelector('.menu-close'),
  logInBtn: document.querySelector('.mobile-menu-sign-up-btn'),
  logOutBtn: document.querySelector('.mobile-menu-log-out'),
};

selectors.mobileMenuBtn.addEventListener('click', openMobileMenu);

function openMobileMenu(evt) {
  selectors.mobileMenu.classList.remove('is-hidden-mobile-menu');
  selectors.openMobMenuBtn.classList.add('visually-hidden');
  selectors.closeMobMenuBtn.classList.remove('visually-hidden');

  document.body.style.overflow = 'hidden';
  selectors.mobileMenu.style.overflow = 'auto';

  selectors.mobileMenuBtn.removeEventListener('click', openMobileMenu);

  selectors.mobileMenuBtn.addEventListener('click', closeMobileMenu);
  selectors.logInBtn.addEventListener('click', onSignupBtnClick);
  selectors.logOutBtn.addEventListener('click', firebaseService.onSignOut);
}

function closeMobileMenu(evt) {
  selectors.mobileMenu.classList.add('is-hidden-mobile-menu');
  selectors.openMobMenuBtn.classList.remove('visually-hidden');
  selectors.closeMobMenuBtn.classList.add('visually-hidden');

  document.body.style.overflow = '';
  selectors.mobileMenu.style.overflow = '';

  selectors.logOutBtn.removeEventListener('click', firebaseService.onSignOut);
  selectors.mobileMenuBtn.removeEventListener('click', closeMobileMenu);
  selectors.logInBtn.removeEventListener('click', onSignupBtnClick);

  selectors.mobileMenuBtn.addEventListener('click', openMobileMenu);
}

function onSignupBtnClick() {
  if (isUserAuthorized()) {
    selectors.logOutBtn.classList.toggle('is-hidden');

    closeAuthModal();
  } else {
    showAuthModal();
  }
}
