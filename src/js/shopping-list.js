// SHOPPING LIST

import shoppingListEmptyImg from '../../src/img/empty-shopping-list.png';
import amazonIcon from '../../src/img/amazon-icon.png';
import appleBookIcon from '../../src/img/apple-book-icon.png';
import bookShopIcon from '../../src/img/book-shop-icon.png';
import iconsSvg from '../../src/img/icons.svg';
import placeholderCoverBook from '../img/placeholder-cover-book.png';
import { Notify } from 'notiflix';

document.addEventListener('DOMContentLoaded', createShoppingList);

const selectors = {
  headerNavLinkHome: document.querySelector('.nav-link-home'),
  headerNavLinkShoppingList: document.querySelector('.nav-link-shoppinglist'),
  mobileMenuNavLinkHome: document.querySelector(
    '.mobile-menu-nav-link.nav-link-home'
  ),
  mobileMenuNavLinkShoppingList: document.querySelector(
    '.mobile-menu-nav-link.nav-link-shoppinglist'
  ),
};

function dataChangeLocalstorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    Notify.failure(`Set state error: ${error.message}`);
  }
}

function createShoppingList(e) {
  if (!e.target.location.pathname.includes('/shopping-list.html')) {
    return;
  }

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
  if (!localStorage.getItem('shoppingList')) {
    return;
  }

  const savedData = localStorage.getItem('shoppingList');
  const parsedData = JSON.parse(savedData);

  return parsedData;
}

function createMarkup(data) {
  const shoppinglistContainer = document.querySelector(
    '.shopping-list-container'
  );

  shoppinglistContainer.innerHTML = `
  <h2 class="shopping-list-title ">Shopping <span class="shopping-list-title shopping-list-title-item">List</span></h2>
  `;

  if (!data) {
    shoppinglistContainer.innerHTML += `
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="${shoppingListEmptyImg}" alt="empty list " width="265"/>
        </div>
        `;

    return;
  }

  if (data === null || data.length === 0) {
    shoppinglistContainer.innerHTML += `
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="${shoppingListEmptyImg}" alt="empty list " width="265"/>
        </div>
        `;
  } else {
    shoppinglistContainer.innerHTML += data
      .map(
        el => `
    <div class="shopping-list-card" data-title="${el.bookName}">
    
    <div class="card-img-wrap"><img class="shopping-list-card-img" src="${
      el.bookImage || placeholderCoverBook
    }" alt="book image" /></div>
    
    <div class="shopping-list-card-descr">

    <h3 class="shopping-list-card-title">${el.bookName}</h3>
    <p class="shopping-list-card-category">${el.listName}</p>
    <p class="shopping-list-card-description">${el.description}</p>
    <div class="shopping-list-card-wrap">
    <p class="shopping-list-card-author">${el.bookAuthor}</p>
    <ul class="shopping-list-card-linkshop">
        <li class="shop-item" >
            <a class="shop-link" href="${
              el.buyLinks[0].url
            }" target="_blank" rel="noopener noreferrer nofollow" aria-label="Open book on Amazon">
            <img class="shopping-list-amazon-img" src="${amazonIcon}" alt="logo-amazon " width="32" height="11"/>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${
              el.buyLinks[1].url
            }" target="_blank" rel="noopener noreferrer nofollow" aria-label="Open book on Apple Books">
            <img class="shopping-list-applebook-img shop-icon" src="${appleBookIcon}" alt="logo-applebook " width="16" height="16" />
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${
              el.buyLinks[2].url
            }" target="_blank" rel="noopener noreferrer nofollow" aria-label="Open book on Barnes and Noble">
            <img class="shopping-list-bookshop-img shop-icon" src="${bookShopIcon}" alt="logo-bookshop " width="16"
  height="16" />
                
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete button" aria-label="Delete book from shopping list">
        <svg class="icon-delete-button" width="16" height="16">
            <use href="${iconsSvg}#icon-trash-icon"></use>
        </svg>
    </button>
    </div>
    `
      )
      .join(``);
  }
}

function onDeleteBook(e) {
  if (
    !e.target.classList.contains('icon-delete-button') &&
    !e.target.closest('button.button-delete')
  ) {
    return;
  }

  const deleteBook = e.target.closest('.shopping-list-card');
  const deleteBookName = deleteBook.dataset.title;
  const data = getDataLocalStorage();
  const indexDeleteBook = data.findIndex(el => el.bookName === deleteBookName);
  data.splice(indexDeleteBook, 1);

  dataChangeLocalstorage('shoppingList', data);

  createMarkup(data);
}
