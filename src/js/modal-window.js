import axios from 'axios';
import FirebaseService from './firebase-services';
import placeholderCoverBook from '../img/placeholder-cover-book.png';
import Notify from './notify-settings';
import { createMarkupBuyLinks, errorMessageText } from './helpers';

const API_URL = 'https://books-backend.p.goit.global/books';
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
};
const removeBookFromShoppingListBtnText = 'Remove from the shopping list';
const addBookToShoppingListBtnText = 'Add to shopping list';
const firebaseService = new FirebaseService();
const shoppingList = [];
let openBook = {};

if (
  localStorage.getItem('shoppingList') &&
  localStorage.getItem('shoppingList').length > 0
) {
  const savedBooks = JSON.parse(localStorage.getItem('shoppingList')) || [];

  shoppingList.push(...savedBooks);
}

document.addEventListener('DOMContentLoaded', addEventListenerModal);

export function openBookModal(evt) {
  evt.preventDefault();

  const bookItem = evt.target.closest('li.books-list-item');

  if (!bookItem) return;

  fetchBookById(bookItem.dataset.id)
    .then(
      ({
        book_image,
        title,
        author,
        description,
        _id,
        buy_links,
        list_name,
      }) => {
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

        if (!!~findBookInShoppingList(shoppingList, openBook)) {
          selectors.addBookBtn.textContent = removeBookFromShoppingListBtnText;
          selectors.addBookBtn.addEventListener('click', removeBook);

          if (
            selectors.textNotificationOfAdded.classList.contains(
              'visually-hidden'
            )
          ) {
            selectors.textNotificationOfAdded.classList.remove(
              'visually-hidden'
            );
          }
        } else {
          selectors.addBookBtn.addEventListener('click', addBook);
          selectors.addBookBtn.textContent = addBookToShoppingListBtnText;
          selectors.textNotificationOfAdded.classList.add('visually-hidden');
        }

        openModal();

        selectors.closeModalBtn.addEventListener('click', closeModal);
        selectors.backdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', closeModal);
      }
    )
    .catch(err => Notify.failure(errorMessageText));
}

function addEventListenerModal(evt) {
  if (evt.target.location.pathname.includes('/shopping-list.html')) return;

  selectors.booksListWrap.addEventListener('click', openBookModal);
}

async function fetchBookById(id) {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);

    if (resp.status !== 200) {
      throw new Error(errorMessageText);
    }

    return resp.data;
  } catch (error) {
    throw new Error(errorMessageText);
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
  shoppingList.push(openBook);

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

  firebaseService.addDataToDb('shoppingList', 'books', { shoppingList });

  selectors.textNotificationOfAdded.classList.remove('visually-hidden');
  selectors.addBookBtn.textContent = removeBookFromShoppingListBtnText;
  selectors.addBookBtn.removeEventListener('click', addBook);
  selectors.addBookBtn.addEventListener('click', removeBook);
}

function removeBook() {
  const idRemoveBook = findBookInShoppingList(shoppingList, openBook);

  shoppingList.splice(idRemoveBook, 1);

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

  firebaseService.addDataToDb('shoppingList', 'books', { shoppingList });

  selectors.textNotificationOfAdded.classList.add('visually-hidden');
  selectors.addBookBtn.textContent = addBookToShoppingListBtnText;
  selectors.addBookBtn.removeEventListener('click', removeBook);
  selectors.addBookBtn.addEventListener('click', addBook);
}

function findBookInShoppingList(shoppingList, currentBook) {
  return shoppingList.findIndex(book => book.bookId === currentBook.bookId);
}
