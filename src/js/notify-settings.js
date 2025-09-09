import '@fortawesome/fontawesome-free/css/all.css';
import { Notify } from 'notiflix';

Notify.init({
  cssAnimationStyle: 'from-right',
  position: 'right-top',
  width: '345px',
  borderRadius: '18px',
  fontFamily: 'DM Sans',
  fontSize: '16px',

  closeButton: true,
  pauseOnHover: true,
  useIcon: true,
  useFontAwesome: true,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '35px',
  messageMaxLength: 150,
  showOnlyTheLastOne: true,

  success: {
    background: 'rgba(0, 128, 0, 0.8)',
    fontAwesomeClassName: 'fa-solid fa-book-open',
    fontAwesomeIconColor: '#93e4c1',
  },

  failure: {
    background: '#e84a5f',
    fontAwesomeClassName: 'fa-solid fa-triangle-exclamation',
    fontAwesomeIconColor: '#ff847c',
    timeout: 5000,
    clickToClose: true,
  },
});

export default Notify;
