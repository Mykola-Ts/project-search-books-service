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

const firebaseConfig = {
  apiKey: 'AIzaSyD73oYitNm6HMY6U12Qvku2isqF0ZeRwg0',
  authDomain: 'search-book-service.firebaseapp.com',
  projectId: 'search-book-service',
  storageBucket: 'search-book-service.appspot.com',
  messagingSenderId: '941650109651',
  appId: '1:941650109651:web:2653c587a2d01f772fa026',
};

const LOCAL_USER_KEY = 'currentUser';
const LOKAL_THEME_KEY = 'currentTheme';
const LOKAL_DATA_KEY = 'book-list';
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();
const localStorageService = new LocalStorageService();

const userCollectionRef = collection(db, 'users');

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
    this.signUpLink = signUpLink;
    this.signInLink = signInLink;
    this.modal = modal;
    this.closeBtn = closeBtn;
    this.form = form;
    this.input = input;

    this.createUser = this.createUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.monitorAuthState = this.monitorAuthState.bind(this);
    this.showAuthModal = this.showAuthModal.bind(this);
    this.closeAuthModal = this.closeAuthModal.bind(this);
    this.onError = this.monitorAuthState.bind(this);
  }

  async createUser(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      this.logInBtn.textContent = name;
      const userData = { uid, name, email };
      localStorageService.saveToLocalStorage(LOCAL_USER_KEY, userData);
      this.closeAuthModal();
      await setDoc(doc(db, `users/${uid}`), userData, { merge: true });
    } catch (error) {
      this.onError(error);
    }
  }

  async signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const docSnap = await getDoc(doc(db, `users/${uid}`));
      localStorageService.saveToLocalStorage(LOCAL_USER_KEY, docSnap.data());
      this.logInBtn.textContent = docSnap.data().name;
      this.closeAuthModal();
    } catch (error) {
      this.onError(error);
    }
  }

  async onSignOut() {
    console.log(auth);
    console.log(this.logOutBtn);
    try {
      await signOut(auth);
      this.logOutBtn.classList.add('is-hidden');
      this.logInBtn.textContent = 'Sign up';
      this.closeAuthModal();
    } catch (error) {
      this.onError(error);
    }
  }

  monitorAuthState() {
    const disableAuthListener = onAuthStateChanged(auth, user => {
      if (user) {
        this.logOutBtn.classList.toggle('is-hidden');
      } else {
        localStorageService.removeFromLocalStorage(LOCAL_USER_KEY);
        this.showAuthModal();
      }
    });
  }

  showAuthModal() {
    this.modal.classList.remove('is-hidden');
  }

  closeAuthModal() {
    this.modal.classList.add('is-hidden');
  }

  onError(error) {
    console.log(error.code);
    console.log(error.message);
  }

  //   const userCollectionRef = collection(db, 'users');

  async addData(data) {
    const docData = loadFromLocalStorage(LOCAL_USER_KEY);
    console.log(docData);
    try {
      await setDoc(doc(db, `users/${docData.uid}`), docData, { merge: true });
    } catch (error) {
      onError(error);
    }
  }

  async addNewDocument(data) {
    try {
      const newDoc = await addDoc(doc(db, `users/${docData.uid}`), docData, {
        merge: true,
      });
    } catch (error) {
      onError(error);
    }
  }

  async readData(params) {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(JSON.stringify(doc.data()));
    });
  }
}
