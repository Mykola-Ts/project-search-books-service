import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import LocalStorageService from './localstorage-services';
import {
  closeAuthModal,
  userLoggedInBtnStyle,
  userLoggedOutBtnStyle,
} from './authorization-window';
import { currentTheme } from './header';

import { showLoader } from './loader';
import { hideLoader } from './loader';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '@fortawesome/fontawesome-free/css/all.css';

const LOCAL_USER_KEY = 'currentUser';
const LOCAL_THEME_KEY = 'currentTheme';
const LOCAL_DATA_KEY = 'shoppingList';
const localStorageService = new LocalStorageService();

export default class FirebaseService {
  firebaseConfig = {
    apiKey: 'AIzaSyD73oYitNm6HMY6U12Qvku2isqF0ZeRwg0',
    authDomain: 'search-book-service.firebaseapp.com',
    projectId: 'search-book-service',
    storageBucket: 'search-book-service.appspot.com',
    messagingSenderId: '941650109651',
    appId: '1:941650109651:web:2653c587a2d01f772fa026',
  };

  firebaseApp = initializeApp(this.firebaseConfig);
  auth = getAuth(this.firebaseApp);
  db = getFirestore();

  createUser = async (email, password, name) => {
    showLoader(document.querySelector('.auth-form'));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const userData = {
        uid,
        name,
        email,
      };
      const currentTheme = localStorage.getItem(LOCAL_THEME_KEY);
      const themeData = { currentTheme };

      this.addDataToDb('currentUser', 'users', userData);
      this.addDataToDb('currentTheme', 'themes', themeData);

      localStorageService.saveToLocalStorage(LOCAL_USER_KEY, userData);

      userLoggedInBtnStyle(name);
    } catch (error) {
      hideLoader(document.querySelector('.auth-form'));
      this.onError(error);
    }
    hideLoader(document.querySelector('.auth-form'));
  };

  signInUser = async (email, password) => {
    showLoader(document.querySelector('.loader-thumb'));

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.readDataFromDb(LOCAL_USER_KEY, 'users');
      this.readThemeFromDb();
      this.readBooksFromDb();

      const userData = userLoggedInBtnStyle(this.userName);
    } catch (error) {
      hideLoader(document.querySelector('.loader-thumb'));
      this.onError(error);
    }
    hideLoader(document.querySelector('.loader-thumb'));
  };

  onSignOut = async () => {
    showLoader(document.querySelector('.auth-form'));

    try {
      await signOut(this.auth);
      userLoggedOutBtnStyle();
      closeAuthModal();
    } catch (error) {
      hideLoader(document.querySelector('.auth-form'));
      this.onError(error);
    }
    hideLoader(document.querySelector('.auth-form'));
  };

  disableAuthListener = onAuthStateChanged(this.auth, async user => {
    if (user) {
      closeAuthModal();
      currentTheme();
      this.readUserNameFromDb(user);
    } else {
      localStorageService.removeFromLocalStorage(LOCAL_USER_KEY);
    }
  });

  onError = error => {
    Notify.failure(
      `Oops, something went wrong. Try reloading the page. Here's the error message: ${error.message}`,
      {
        clickToClose: true,
      }
    );
  };

  addDataToDb = async (key, collectionName, data) => {
    const user =
      this.auth.currentUser ||
      localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
    if (!user) {
      return;
    }
    data = data || localStorageService.loadFromLocalStorage(key);

    const docRef = doc(this.db, `${collectionName}/${user.uid}`);
    try {
      await setDoc(docRef, data);
    } catch (error) {
      this.onError(error);
    }
  };

  addThemeToDb = async () => {
    const user =
      this.auth.currentUser ||
      localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
    if (!user) {
      return;
    }
    const theme = localStorageService.loadFromLocalStorage(LOCAL_THEME_KEY);
    const docRef = doc(this.db, `themes/${user.uid}`);
    try {
      await setDoc(docRef, theme);
    } catch (error) {
      this.onError(error);
    }
  };

  readUserNameFromDb = async userInstance => {
    const docRef = doc(this.db, `users/${userInstance.uid}`);
    try {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        userLoggedInBtnStyle(data.name);
      }
    } catch (error) {
      this.onError(error);
    }
  };

  readDataFromDb = async (key, collectionName) => {
    const user =
      this.auth.currentUser ||
      localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
    const docRef = doc(this.db, `${collectionName}/${user.uid}`);
    try {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();

        localStorageService.saveToLocalStorage(key, data);
      }
    } catch (error) {
      this.onError(error);
    }
  };

  readBooksFromDb = async () => {
    const user =
      this.auth.currentUser ||
      localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
    const docRef = doc(this.db, `books/${user.uid}`);
    try {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        let arrayOfBooks = data.shoppingList;

        localStorageService.saveToLocalStorage(LOCAL_DATA_KEY, arrayOfBooks);
      }
    } catch (error) {
      this.onError(error);
    }
  };

  addThemeToDb = async () => {
    const user =
      this.auth.currentUser ||
      localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
    if (!user) {
      return;
    }
    const theme = localStorage.getItem(LOCAL_THEME_KEY);
    const docRef = doc(this.db, `themes/${user.uid}`);
    try {
      await setDoc(docRef, theme);
    } catch (error) {
      this.onError(error);
    }
  };

  readThemeFromDb = async () => {
    const user =
      this.auth.currentUser ||
      localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
    const docRef = doc(this.db, `themes/${user.uid}`);
    try {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();

        localStorage.setItem(LOCAL_THEME_KEY, data.currentTheme);
      }
      currentTheme();
    } catch (error) {
      this.onError(error);
    }
  };
}
