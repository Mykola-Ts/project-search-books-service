// AUTHORIZATION WINDOW

import { initializeApp } from 'firebase/app';
import 'firebase/auth';
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

const refs = {
  logInBtn: document.querySelector('button[data-login-button]'),
  logOutBtn: document.querySelector('button[data-logout-button]'),
  authBtn: document.querySelector('button[data-modal-signup]'),
  signUpLink: document.querySelector('button[data-modal-signup-link]'),
  signInLink: document.querySelector('button[data-modal-signin-link]'),
  modal: document.querySelector('div[data-modal]'),
  closeBtn: document.querySelector('button[data-modal-close]'),
  form: document.querySelector('.auth-form'),
  input: document.querySelector('#name'),
};

const firebaseConfig = {
  apiKey: 'AIzaSyD73oYitNm6HMY6U12Qvku2isqF0ZeRwg0',
  authDomain: 'search-book-service.firebaseapp.com',
  projectId: 'search-book-service',
  storageBucket: 'search-book-service.appspot.com',
  messagingSenderId: '941650109651',
  appId: '1:941650109651:web:2653c587a2d01f772fa026',
};

const LOCALSTORAGE_KEY = 'currentUser';
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

refs.logInBtn.addEventListener('click', monitorAuthState);
refs.logOutBtn.addEventListener('click', onSignOut);
refs.form.addEventListener('submit', onAuthFormSubmit);
refs.closeBtn.addEventListener('click', closeAuthModal);
refs.signInLink.addEventListener('click', onSignInLink);
refs.signUpLink.addEventListener('click', onSignUpLink);

function onAuthFormSubmit(evt) {
  evt.preventDefault();

  let {
    elements: {
      name: { value: name },
      email: { value: email },
      password: { value: password },
    },
  } = evt.currentTarget;

  name = name || email;

  switch (evt.submitter.innerText) {
    case 'SIGN UP':
      evt.currentTarget.reset();
      createUser(email, password, name);
      break;
    case 'SIGN IN':
      evt.currentTarget.reset();
      signInUser(email, password, name);
      break;
  }
  const { currentUser } = firebaseApp.auth();
  console.log(currentUser.uid);
}

function monitorAuthState() {
  onAuthStateChanged(auth, user => {
    if (user) {
      refs.logOutBtn.hidden = refs.logOutBtn.hidden ? false : true;
    } else {
      removeFromLocalStorage(LOCALSTORAGE_KEY);
      showAuthModal();
    }
  });
}

async function createUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    refs.logInBtn.textContent = name;
    const userData = { uid, name, email };
    saveToLocalStorage(LOCALSTORAGE_KEY, userData);
    closeAuthModal();
    await setDoc(doc(db, `users/${uid}`), userData, { merge: true });
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const docSnap = await getDoc(doc(db, `users/${uid}`));
    saveToLocalStorage(LOCALSTORAGE_KEY, docSnap.data());
    refs.logInBtn.textContent = docSnap.data().name;
    closeAuthModal();
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

async function onSignOut() {
  try {
    await signOut(auth);
    refs.logOutBtn.hidden = true;
    refs.logInBtn.textContent = 'Sign Up';
    closeAuthModal();
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

function showAuthModal() {
  refs.modal.classList.remove('is-hidden');
}

function closeAuthModal() {
  refs.modal.classList.add('is-hidden');
}

function onSignUpLink() {
  refs.input.hidden = false;
  refs.authBtn.textContent = 'Sign Up';
}

function onSignInLink() {
  refs.input.hidden = true;
  refs.authBtn.textContent = 'Sign In';
}

const userCollectionRef = collection(db, 'users');

async function addData(data) {
  const docData = loadFromLocalStorage(LOCALSTORAGE_KEY);
  console.log(docData);
  try {
    await setDoc(doc(db, `users/${docData.uid}`), docData, { merge: true });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function addNewDocument(data) {
  try {
    const newDoc = await addDoc(doc(db, `users/${docData.uid}`), docData, {
      merge: true,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function readData(params) {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(JSON.stringify(doc.data()));
  });
}

function saveToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Remove state error: ', error.message);
  }
}
