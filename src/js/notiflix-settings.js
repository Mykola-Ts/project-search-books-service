import Notiflix from 'notiflix';
import '@fortawesome/fontawesome-free/css/all.css';

export default Notiflix.Notify.init({
  cssAnimationStyle: 'from-bottom',
  position: 'left-bottom',
  width: '345px',
  borderRadius: '18px',
  fontFamily: 'DM Sans',
  fontSize: '18px',

  clickToClose: true,
  closeButton: true,
  pauseOnHover: true,
  useIcon: true,
  useFontAwesome: true,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '35px',
  messageMaxLength: 150,

  success: {
    background: '#3baea0',
    fontAwesomeClassName: 'fa-solid fa-book-open',
    fontAwesomeIconColor: '#93e4c1',
  },

  failure: {
    background: '#e84a5f',
    fontAwesomeClassName: 'fa-solid fa-book-skull',
    fontAwesomeIconColor: '#ff847c',
    timeout: 5000,
  },
});
