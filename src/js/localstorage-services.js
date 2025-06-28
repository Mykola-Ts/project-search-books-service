import '@fortawesome/fontawesome-free/css/all.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { errorMessageText } from './helpers';

Notify.init({
  cssAnimationStyle: 'from-top',
  width: '345px',
  position: 'rigth-top',
  borderRadius: '18px',
  fontFamily: 'DM Sans',
  fontSize: '18px',

  clickToClose: true,
  useIcon: true,
  pauseOnHover: true,
  useFontAwesome: true,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '35px',

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

export default class LocalStorageService {
  saveToLocalStorage(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      this.onError(error);
    }
  }

  loadFromLocalStorage(key) {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      this.onError(error);
    }
  }

  removeFromLocalStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      this.onError(error);
    }
  }

  onError(error) {
    Notify.failure(errorMessageText, {
      clickToClose: true,
    });
  }
}
