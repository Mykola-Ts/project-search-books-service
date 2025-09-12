import Notify from './notify-settings';
import { errorMessageText } from './helpers';

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
    Notify.failure(errorMessageText);
  }
}
