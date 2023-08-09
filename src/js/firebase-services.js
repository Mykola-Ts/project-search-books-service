import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
} from 'firebase/firestore';

import LocalStorageService from './localstorage-services';
import { showAuthModal, closeAuthModal } from './authorization-window';
// import { dataChangeLocalstorage } from './shopping-list';
import { currentTheme } from './header';

const LOCAL_USER_KEY = 'currentUser';
const LOCAL_THEME_KEY = 'currentTheme';
const LOCAL_DATA_KEY = 'shoppingList';
const localStorageService = new LocalStorageService();

export default class FirebaseService {
  constructor({
    logInBtn,
    logOutBtn,
    authBtn,
    signUpLink,
    signInLink,
    modal,
    closeBtn,
    form,
    input,
  } = {}) {
    this.logInBtn = logInBtn;
    this.logOutBtn = logOutBtn;
    this.authBtn = authBtn;
    this.form = form;
    this.input = input;
  }

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

  userCollectionRef = collection(this.db, 'users');
  // themeCollectionRef = collection(this.userCollectionRef, 'theme');
  // booksCollectionRef = collection(this.userCollectionRef, 'books');

  createUser = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.logInBtn.textContent = name;
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
    } catch (error) {
      this.onError(error);
    }
  };

  signInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.readDataFromDb(LOCAL_USER_KEY, 'users');
      this.readDataFromDb(LOCAL_THEME_KEY, 'themes');
      this.readDataFromDb(LOCAL_DATA_KEY, 'books');
    } catch (error) {
      this.onError(error);
    }
  };

  onSignOut = async () => {
    try {
      await signOut(this.auth);
      this.logOutBtn.classList.add('is-hidden');
      this.logInBtn.textContent = 'Sign up';
      closeAuthModal();
    } catch (error) {
      this.onError(error);
    }
  };

  disableAuthListener = onAuthStateChanged(this.auth, async user => {
    if (user) {
      closeAuthModal();
      currentTheme();
    } else {
      localStorageService.removeFromLocalStorage(LOCAL_USER_KEY);
    }
  });

  isUserAuthorized = () => {
    return localStorageService.loadFromLocalStorage(LOCAL_USER_KEY)
      ? true
      : false;
  };

  onError = error => {
    console.log(error);
    console.log(error.message);
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

  readThemeFromDb = async (key, collectionName, serialized) => {
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

  // this.logInBtn.textContent = userData.name;

  //   addDataFromLocalToCloud = async (key, ref) => {
  //     const data = localStorageService.loadFromLocalStorage(key);
  //     try {
  //       await setDoc(ref, data);
  //     } catch (error) {
  //       this.onError(error);
  //     }
  //   };

  //   readDataFromDbToLocal = async (key, ref) => {
  //     try {
  //       const snapshot = await getDoc(ref);
  //       if (snapshot.exists()) {
  //         const userData = snapshot.data();
  //         localStorageService.saveToLocalStorage(key, userData);
  //         this.logInBtn.textContent = userData.name;
  //       }
  //     } catch (error) {
  //       this.onError(error);
  //     }
  //   };

  //   addShoppingListToDb = async data => {
  //     const user = localStorageService.loadFromLocalStorage(LOCAL_USER_KEY);
  //     if (!user) {
  //       return;
  //     }
  //     const docRef = doc(this.db, `users/${user.uid}`);
  //     const userData = { shoppingList: data };
  //     try {
  //       await setDoc(docRef, userData, { merge: true });
  //     } catch (error) {
  //       this.onError(error);
  //     }
  //   };
}
