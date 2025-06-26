import { saveNewTheme } from './authorization-window';

const THEME = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const body = document.querySelector('body');
const themeSwitch = document.querySelector('.theme-switch-toggle');

themeSwitch.addEventListener('change', onChange);

currentTheme();

function onChange(evt) {
  if (!evt.currentTarget.checked) {
    body.classList.add(THEME.LIGHT);
    body.classList.remove(THEME.DARK);

    localStorage.setItem('currentTheme', THEME.LIGHT);
  } else {
    body.classList.add(THEME.DARK);
    body.classList.remove(THEME.LIGHT);

    localStorage.setItem('currentTheme', THEME.DARK);
  }

  saveNewTheme();
}

function currentTheme() {
  switch (localStorage.getItem('currentTheme')) {
    case THEME.LIGHT:
      body.classList.add(THEME.LIGHT);
      body.classList.remove(THEME.DARK);
      themeSwitch.checked = false;
      break;

    case THEME.DARK:
      body.classList.remove(THEME.LIGHT);
      body.classList.add(THEME.DARK);
      themeSwitch.checked = true;
      break;

    default:
      body.classList.add(THEME.LIGHT);

      localStorage.setItem('currentTheme', THEME.LIGHT);
  }
}

export { currentTheme };
