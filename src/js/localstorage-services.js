import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '@fortawesome/fontawesome-free/css/all.css';

Notify.init({
  width: '345px',
  position: 'rigth-top',
  cssAnimationStyle: 'from-top',
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
    Notify.failure(
      `Oops, something went wrong. Try reloading the page. Here's the error message: ${error.message}`,
      {
        clickToClose: true,
      }
    );
  }
}
