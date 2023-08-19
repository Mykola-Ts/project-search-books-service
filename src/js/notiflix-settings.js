import Notiflix from 'notiflix';
import '@fortawesome/fontawesome-free/css/all.css';

export default Notiflix.Notify.init({
  width: '345px',
  position: 'left-bottom',
  cssAnimationStyle: 'from-bottom',
  borderRadius: '18px',
  fontFamily: 'DM Sans',
  fontSize: '18px',
  clickToClose: true,
  useIcon: true,
  pauseOnHover: true,
  useFontAwesome: true,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '35px',
  messageMaxLength: 150,
  closeButton: true,
  success: {
    background: '#3baea0',
    fontAwesomeClassName: 'fa-solid fa-book-open',
    fontAwesomeIconColor: '#93e4c1',
  },
  failure: {
    background: '#e84a5f',
    fontAwesomeClassName: 'fa-solid fa-book-skull',
    fontAwesomeIconColor: '#ff847c',
  },
});
