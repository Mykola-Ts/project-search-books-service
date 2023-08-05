// HEADER
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  body: document.body,
  header: document.querySelector('.header'),
  themeSwitch: document.querySelector('.theme-switch-toggle'),
  logoText: document.querySelector('.logo-text'),
  headerNavList: document.querySelector('.header-nav-list'),
  headerNavListBag: document.querySelector('.header-nav-list .shop-bag'),
  mibileMenuBtn: document.querySelector('.mobile-menu-btn-icon'),
  menuOpen: document.querySelector('.menu-open'),
  bag: document.querySelector('.bag'),
};

refs.themeSwitch.addEventListener('change', onChange);

function onChange(evt) {
  if (!evt.currentTarget.checked) {
    refs.body.classList.add(Theme.LIGHT);
    refs.header.classList.add(Theme.LIGHT);
    refs.logoText.classList.add(Theme.LIGHT);
    refs.headerNavList.classList.add(Theme.LIGHT);
    refs.headerNavListBag.classList.add(Theme.LIGHT);
    refs.mibileMenuBtn.classList.add(Theme.LIGHT);
    refs.menuOpen.classList.add(Theme.LIGHT);
    refs.bag.classList.add(Theme.LIGHT);
    refs.body.classList.remove(Theme.DARK);
    refs.header.classList.remove(Theme.DARK);
    refs.logoText.classList.remove(Theme.DARK);
    refs.headerNavList.classList.remove(Theme.DARK);
    refs.headerNavListBag.classList.remove(Theme.DARK);
    refs.mibileMenuBtn.classList.remove(Theme.DARK);
    refs.menuOpen.classList.remove(Theme.DARK);
    refs.bag.classList.remove(Theme.DARK);
    localStorage.setItem('theme', Theme.LIGHT);
  } else {
    refs.body.classList.add(Theme.DARK);
    refs.header.classList.add(Theme.DARK);
    refs.logoText.classList.add(Theme.DARK);
    refs.headerNavList.classList.add(Theme.DARK);
    refs.headerNavListBag.classList.add(Theme.DARK);
    refs.mibileMenuBtn.classList.add(Theme.DARK);
    refs.menuOpen.classList.add(Theme.DARK);
    refs.bag.classList.add(Theme.DARK);
    refs.body.classList.remove(Theme.LIGHT);
    refs.header.classList.remove(Theme.LIGHT);
    refs.logoText.classList.remove(Theme.LIGHT);
    refs.headerNavList.classList.remove(Theme.LIGHT);
    refs.headerNavListBag.classList.remove(Theme.LIGHT);
    refs.mibileMenuBtn.classList.remove(Theme.LIGHT);
    refs.menuOpen.classList.remove(Theme.LIGHT);
    refs.bag.classList.remove(Theme.LIGHT);
    localStorage.setItem('theme', Theme.DARK);
  }
}

function currentTheme() {
  const savedTheme = localStorage.getItem('theme');
  console.log(savedTheme);
  if (savedTheme) {
    refs.body.classList.add(savedTheme);
    refs.header.classList.add(savedTheme);
    refs.logoText.classList.add(savedTheme);
    refs.headerNavList.classList.add(savedTheme);
    refs.headerNavListBag.classList.add(savedTheme);
    refs.mibileMenuBtn.classList.add(savedTheme);
    refs.menuOpen.classList.add(savedTheme);
    refs.bag.classList.add(savedTheme);
    if (savedTheme === Theme.DARK) {
      themeSwitch.checked = true;
    }
  } else {
    refs.body.classList.add(Theme.LIGHT);
    refs.header.classList.add(Theme.LIGHT);
    refs.logoText.classList.add(Theme.LIGHT);
    refs.headerNavList.classList.add(Theme.LIGHT);
    refs.headerNavList.classList.add(Theme.LIGHT);
    refs.headerNavListBag.classList.add(Theme.LIGHT);
    refs.menuOpen.classList.add(Theme.LIGHT);
    refs.bag.classList.add(Theme.LIGHT);
  }
}
