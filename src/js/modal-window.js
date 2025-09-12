import FirebaseService from './firebase-services';
import Notify from './notify-settings';
import placeholderCoverBook from '../img/placeholder-cover-book.png';
import { createMarkupBuyLinks, errorMessageText } from './helpers';
import { fetchBookById } from './fetch-data';
import { hideLoader, showLoader } from './loader';

const selectors = {
  closeModalBtn: document.querySelector('button[data-modal-window-close]'),
  modal: document.querySelector('div[data-modal-window]'),
  backdrop: document.querySelector('.backdrop-modal'),
  addBookBtn: document.querySelector('.modal-btn-add'),
  textNotificationOfAdded: document.querySelector(
    '.text-notification-of-added'
  ),
  modalWrap: document.querySelector('.modal-wrap'),
  booksListWrap: document.querySelector('.books-list-wrap'),
  loader: document.querySelector('.loader-wrap'),
};
const removeBookFromShoppingListBtnText = 'Remove from the shopping list';
const addBookToShoppingListBtnText = 'Add to shopping list';
const firebaseService = new FirebaseService();
const savedShoppingList = localStorage.getItem('shoppingList');
const shoppingList = [];
let openBook = {};

if (savedShoppingList && savedShoppingList.length > 0) {
  try {
    const savedBooks = JSON.parse(savedShoppingList) || [];

    shoppingList.push(...savedBooks);
  } catch (error) {
    Notify.failure(errorMessageText);
  }
}

document.addEventListener('DOMContentLoaded', addEventListenerModal);

function addEventListenerModal(evt) {
  if (evt.target.location.pathname.includes('/shopping-list')) return;

  selectors.booksListWrap.addEventListener('click', handlerOpenBookModal);
}

export function handlerOpenBookModal(evt) {
  evt.preventDefault();

  const bookItem = evt.target.closest('li.books-list-item');

  if (!bookItem) return;

  createBookModal(bookItem.dataset.id);
}

async function createBookModal(bookId) {
  showLoader(selectors.loader);

  try {
    const book = await fetchBookById(bookId);

    if (!book) throw new Error();

    const {
      book_image,
      title,
      author,
      description,
      _id,
      buy_links,
      list_name,
    } = book;

    openBook = {
      bookId: _id,
      bookName: title,
      bookAuthor: author,
      bookImage: book_image,
      description,
      buyLinks: buy_links,
      listName: list_name,
    };

    selectors.modalWrap.innerHTML = createMarkupModal(
      book_image,
      title,
      author,
      description,
      buy_links
    );

    openModal();
  } catch (error) {
    Notify.failure(errorMessageText);
  } finally {
    hideLoader(selectors.loader);
  }
}

function createMarkupModal(
  image = '',
  title = '',
  author = '',
  description = '',
  buyLinks = []
) {
  const arrBuyLinks = buyLinks.slice(0, 3);

  return `
      <div class="book-img-wrap">
        <img
          src="${image || placeholderCoverBook}"
          alt="${title}"
          width="192"
          height="281"
          loading="lazy"
          class="book-img"
        />
      </div>
      
      <div class="book-descr">
        <h2 class="book-name">${title}</h2>
        <h3 class="book-author">${author}</h3>
        <p class="book-descr-text">${description}</p>
        <ul class="buy-links-list">
          ${createMarkupBuyLinks(arrBuyLinks)}
        </ul>
      </div>
      `;
}

function openModal() {
  selectors.modal.classList.remove('is-hidden-modal');
  selectors.modal.style.overflow = 'auto';
  document.body.style.overflow = 'hidden';

  selectors.closeModalBtn.addEventListener('click', closeModal);
  selectors.backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);

  if (isBookInShoppingList()) {
    selectors.addBookBtn.textContent = removeBookFromShoppingListBtnText;
    selectors.textNotificationOfAdded.classList.remove('visually-hidden');
    selectors.addBookBtn.addEventListener('click', removeBook);
  } else {
    selectors.addBookBtn.textContent = addBookToShoppingListBtnText;
    selectors.textNotificationOfAdded.classList.add('visually-hidden');
    selectors.addBookBtn.addEventListener('click', addBook);
  }
}

function isBookInShoppingList() {
  return !!~findBookInShoppingList(shoppingList, openBook.bookId);
}

function closeModal(evt) {
  if (
    evt.currentTarget !== selectors.closeModalBtn &&
    evt.target !== selectors.backdrop &&
    evt.code !== 'Escape'
  ) {
    return;
  }

  openBook = {};

  selectors.modal.classList.add('is-hidden-modal');
  selectors.modal.style.overflow = '';
  document.body.style.overflow = '';

  selectors.addBookBtn.removeEventListener('click', addBook);
  selectors.addBookBtn.removeEventListener('click', removeBook);
  selectors.closeModalBtn.removeEventListener('click', closeModal);
  selectors.backdrop.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', closeModal);
}

function addBook() {
  if (shoppingList.find(({ bookId }) => bookId === openBook.bookId)) return;

  shoppingList.push(openBook);

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

  firebaseService.addDataToDb('shoppingList', 'books', { shoppingList });

  selectors.textNotificationOfAdded.classList.remove('visually-hidden');
  selectors.addBookBtn.textContent = removeBookFromShoppingListBtnText;
  selectors.addBookBtn.removeEventListener('click', addBook);
  selectors.addBookBtn.addEventListener('click', removeBook);
}

function removeBook() {
  const idRemoveBook = findBookInShoppingList(shoppingList, openBook.bookId);

  if (!~idRemoveBook) return;

  shoppingList.splice(idRemoveBook, 1);

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

  firebaseService.addDataToDb('shoppingList', 'books', { shoppingList });

  selectors.textNotificationOfAdded.classList.add('visually-hidden');
  selectors.addBookBtn.textContent = addBookToShoppingListBtnText;
  selectors.addBookBtn.removeEventListener('click', removeBook);
  selectors.addBookBtn.addEventListener('click', addBook);
}

function findBookInShoppingList(shoppingList = [], currentBookId) {
  return shoppingList.findIndex(({ bookId }) => bookId === currentBookId);
}
