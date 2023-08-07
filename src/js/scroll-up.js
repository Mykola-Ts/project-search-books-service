// SCROLL UP
const scrollUpBtn = document.querySelector('.js-btn-up');
scrollUpBtn.classList.add('is-hidden');

window.addEventListener('scroll', () => {
  window.scrollY > 20
    ? scrollUpBtn.classList.remove('is-hidden')
    : scrollUpBtn.classList.add('is-hidden');
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
