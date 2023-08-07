// MODAL WINDOW
import axios from 'axios';

const selectors = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  backdrop: document.querySelector('.backdrop'),
  addBookBtn: document.querySelector('.modal-btn-add'),
  textNotificationOfAdded: document.querySelector(
    '.text-notification-of-added'
  ),
  modalWrap: document.querySelector('.modal-wrap'),
};
const shoppingList = [];
let openBook = {};

// books.addEventListener('click', openBookModal);

function openBookModal(evt) {
  const bookId = evt.target.closest('li').dataset.id;

  fetchBookById(bookId)
    .then(({ book_image, title, author, description, _id, buy_links }) => {
      openBook = {
        bookId: _id,
        bookName: title,
        bookAuthor: author,
        bookImage: book_image,
        buyLinks: buy_links,
      };

      selectors.modalWrap.innerHTML = createMarkupModal(
        book_image,
        title,
        author,
        description,
        buy_links
      );

      if (!!~findBookInShoppingList(shoppingList, openBook)) {
        selectors.addBookBtn.textContent = 'remove from the shopping list';

        selectors.addBookBtn.addEventListener('click', removeBook);

        if (
          selectors.textNotificationOfAdded.classList.contains(
            'visually-hidden'
          )
        ) {
          selectors.textNotificationOfAdded.classList.remove('visually-hidden');
        }
      } else {
        selectors.addBookBtn.textContent = 'Add to shopping list';

        selectors.addBookBtn.addEventListener('click', addBook);

        if (
          !selectors.textNotificationOfAdded.classList.contains(
            'visually-hidden'
          )
        ) {
          selectors.textNotificationOfAdded.classList.add('visually-hidden');
        }
      }

      openModal();

      selectors.closeModalBtn.addEventListener('click', closeModal);
      selectors.backdrop.addEventListener('click', closeModal);
      document.addEventListener('keydown', closeModal);
    })
    .catch(err => console.log(err));
}

async function fetchBookById(id) {
  const resp = await axios.get(
    `https://books-backend.p.goit.global/books/${id}`
  );

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  return resp.data;
}

function createMarkupModal(image, title, author, description, buyLinks) {
  const arrBuyLinks = buyLinks.slice(0, 3);
  const arrIconsLink = [
    { name: 'Amazon', img: '../img/amazon-icon.png' },
    { name: 'Apple Books', img: '../img/apple-book-icon.png' },
    { name: 'Barnes and Noble', img: '../img/book-shop-icon.png' },
  ];

  const markupLinks = arrBuyLinks
    .map(({ url, name }) => {
      const iconLink = arrIconsLink.find(iconLink => iconLink.name === name);

      return `<li><a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="buy-link">
      <img src="${iconLink.img}" alt="${name}" class="buy-link-icon">
</a></li>`;
    })
    .join('');

  return `<div class="book-img-wrap"><img
    src="${image}"
    alt="${title}"
    width="192"
    height="281"
    class="book-img"
  /></div>
        <div class="book-descr">
          <h2 class="book-name">${title}</h2>
          <h3 class="book-author">${author}</h3>
          <p class="book-descr-text">${description}</p>
          <ul class="buy-links-list">
${markupLinks}
          </ul>
        </div>`;
}

function openModal() {
  selectors.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  selectors.modal.style.overflow = 'auto';
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

  selectors.modal.classList.add('is-hidden');
  document.body.style.overflow = '';
  selectors.modal.style.overflow = '';

  selectors.addBookBtn.removeEventListener('click', addBook);
  selectors.addBookBtn.removeEventListener('click', removeBook);
  selectors.closeModalBtn.removeEventListener('click', closeModal);
  selectors.backdrop.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', closeModal);
}

function addBook(evt) {
  shoppingList.push(openBook);

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

  selectors.addBookBtn.textContent = 'remove from the shopping list';
  selectors.textNotificationOfAdded.classList.remove('visually-hidden');

  selectors.addBookBtn.removeEventListener('click', addBook);
  selectors.addBookBtn.addEventListener('click', removeBook);
}

function removeBook() {
  const idRemoveBook = findBookInShoppingList(shoppingList, openBook);

  shoppingList.splice(idRemoveBook, 1);

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

  selectors.addBookBtn.textContent = 'Add to shopping list';
  selectors.textNotificationOfAdded.classList.add('visually-hidden');

  selectors.addBookBtn.removeEventListener('click', removeBook);
  selectors.addBookBtn.addEventListener('click', addBook);
}

function findBookInShoppingList(shoppingList, currentBook) {
  return shoppingList.findIndex(shoppingList => {
    return shoppingList.bookId === currentBook.bookId;
  });
}
