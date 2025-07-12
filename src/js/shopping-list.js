import shoppingListEmptyImgPng from '../../src/img/empty-shopping-list.png';
import shoppingListEmptyImgPng2x from '../../src/img/empty-shopping-list@2x.png';
import shoppingListEmptyImgWebp from '../../src/img/empty-shopping-list.webp';
import shoppingListEmptyImgWebp2x from '../../src/img/empty-shopping-list@2x.webp';
import iconsSvg from '../../src/img/icons.svg';
import placeholderCoverBook from '../img/placeholder-cover-book.png';
import { Notify } from 'notiflix';
import { createMarkupBuyLinks, errorMessageText } from './helpers';

const selectors = {
  headerNavLinkHome: document.querySelector('.nav-link-home'),
  headerNavLinkShoppingList: document.querySelector('.nav-link-shoppinglist'),
  mobileMenuNavLinkHome: document.querySelector(
    '.mobile-menu-nav-link.nav-link-home'
  ),
  mobileMenuNavLinkShoppingList: document.querySelector(
    '.mobile-menu-nav-link.nav-link-shoppinglist'
  ),
  shoppinglistContainer: document.querySelector('.shopping-list-container'),
};

document.addEventListener('DOMContentLoaded', createShoppingList);

function dataChangeLocalstorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    Notify.failure(errorMessageText);
  }
}

function createShoppingList(e) {
  if (!e.target.location.pathname.includes('/shopping-list.html')) return;

  selectors.headerNavLinkHome.classList.remove('current-page');
  selectors.headerNavLinkShoppingList.classList.add('current-page');
  selectors.mobileMenuNavLinkHome.classList.remove('current-page');
  selectors.mobileMenuNavLinkShoppingList.classList.add('current-page');

  const data = getDataLocalStorage();

  createMarkup(data);

  const btnDeletebook = document.querySelector('.shopping-list');

  if (btnDeletebook) {
    btnDeletebook.addEventListener('click', onDeleteBook);
  }
}

function getDataLocalStorage() {
  if (!localStorage.getItem('shoppingList')) return;

  const savedData = localStorage.getItem('shoppingList');

  return JSON.parse(savedData);
}

function createMarkup(data) {
  selectors.shoppinglistContainer.innerHTML = `
      <h2 class="shopping-list-title">
        Shopping
        <span class="shopping-list-title shopping-list-title-item">List</span>
      </h2>
  `;

  if (!data) {
    selectors.shoppinglistContainer.innerHTML += `
        <div class="empty-shopping-list">
          <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>

          <picture>
            <source
              srcset="${shoppingListEmptyImgWebp} 1x, ${shoppingListEmptyImgWebp2x} 2x"
              type="image/webp" />
            <source
              srcset="${shoppingListEmptyImgPng} 1x, ${shoppingListEmptyImgPng2x} 2x"
              type="image/png" />
            <img
              src="${shoppingListEmptyImgPng}"
              alt="empty list"
              width="265"
              class="shopping-list-empty-img"
          /></picture>
        </div>`;

    return;
  }

  if (data === null || data.length === 0) {
    selectors.shoppinglistContainer.innerHTML += `
        <div class="empty-shopping-list">
            <p class="shopping-list-text-empty">
              This page is empty, add some books and proceed to order.
            </p>

            <picture>
              <source
                srcset="${shoppingListEmptyImgWebp} 1x, ${shoppingListEmptyImgWebp2x} 2x"
                type="image/webp" />
              <source
                srcset="${shoppingListEmptyImgPng} 1x, ${shoppingListEmptyImgPng2x} 2x"
                type="image/png" />
              <img
                src="${shoppingListEmptyImgPng}"
                alt="empty list"
                width="265"
                class="shopping-list-empty-img"
            /></picture>
        </div>`;
  } else {
    selectors.shoppinglistContainer.innerHTML += data
      .map(el => {
        const arrBuyLinks = el.buyLinks.slice(0, 3);

        return `
            <div class="shopping-list-card" data-title="${el.bookName}">
              <div class="card-img-wrap">
                <img
                  class="shopping-list-card-img"
                  src="${el.bookImage || placeholderCoverBook}"
                  alt="book image"
                  loading="lazy"
                />
              </div>

              <div class="shopping-list-card-descr">
                <h3 class="shopping-list-card-title">${el.bookName}</h3>
                <p class="shopping-list-card-category">${el.listName}</p>
                <p class="shopping-list-card-description">${el.description}</p>

                <div class="shopping-list-card-wrap">
                  <p class="shopping-list-card-author">${el.bookAuthor}</p>
                  <ul class="shopping-list-card-linkshop">
                    ${createMarkupBuyLinks(arrBuyLinks)}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                class="button-delete button"
                aria-label="Delete book from shopping list"
              >
                <svg class="icon-delete-button" width="16" height="16">
                  <use href="${iconsSvg}#icon-trash-icon"></use>
                </svg>
              </button>
            </div>
    `;
      })
      .join(``);
  }
}

function onDeleteBook(e) {
  if (
    !e.target.classList.contains('icon-delete-button') &&
    !e.target.closest('button.button-delete')
  )
    return;

  const deleteBook = e.target.closest('.shopping-list-card');
  const deleteBookName = deleteBook.dataset.title;
  const data = getDataLocalStorage();
  const indexDeleteBook = data.findIndex(el => el.bookName === deleteBookName);

  if (!~indexDeleteBook) return;

  data.splice(indexDeleteBook, 1);

  dataChangeLocalstorage('shoppingList', data);

  createMarkup(data);
}
