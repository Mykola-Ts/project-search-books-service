// SHOPPING LIST

import shoppingListEmptyImg from "../../src/img/empty-shopping-list.png";
import amazonIcon from "../../src/img/amazon-icon.png";
import appleBookIcon from "../../src/img/apple-book-icon.png";
import bookShopIcon from "../../src/img/book-shop-icon.png";
import iconsSvg from "../../src/img/icons.svg";

document.addEventListener("DOMContentLoaded", createShoppingList);

const headerNavLinkHome = document.querySelector(".header-nav-link-home");
const headerNavLinkShoppingList = document.querySelector(
  ".header-nav-link-shoppinglist"
);

function dataChangeLocalstorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}

function createShoppingList(e) {
  if (!e.target.location.pathname.includes("/shopping-list.html")) {
    return;
  }

  headerNavLinkHome.classList.remove("current-page");
  headerNavLinkShoppingList.classList.add("current-page");

  const shoppinglistContainer = document.querySelector(
    ".shopping-list-container"
  );

  let data = getDataLocalStorage();

  createMarkup(data);

  const btnDeletebook = document.querySelector(".shopping-list");

  if (btnDeletebook) {
    btnDeletebook.addEventListener(`click`, onDeleteBook);
  }
}

function getDataLocalStorage() {
  if (!localStorage.getItem("shoppingList")) {
    return;
  }

  const savedData = localStorage.getItem(`shoppingList`);
  let parsedData = [];
  return (parsedData = JSON.parse(savedData));
}

function createMarkup(data) {
  const shoppinglistContainer = document.querySelector(
    ".shopping-list-container"
  );

  shoppinglistContainer.innerHTML = `
  <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
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
        (el) => `
    <div class="shopping-list-card" data-title="${el.bookName}">
    
    <img class="shopping-list-card-img" src="${el.bookImage}" alt="book image" />
    
    <div class="shopping-list-card-data">

    <h3 class="shopping-list-card-title">${el.bookName}</h3>
    <p class="shopping-list-card-category">${el.listName}</p>
    <p class="shopping-list-card-description">${el.description}</p>
    <div class="shopping-list-card-wrap">
    <p class="shopping-list-card-author">${el.bookAuthor}</p>
    <ul class="shopping-list-card-linkshop">
        <li class="shop-item" >
            <a class="shop-link" href="${el.buyLinks[0].url}" target="_blank" rel="noopener noreferrer nofollow">
            <img class="shopping-list-amazon-img" src="${amazonIcon}" alt="logo-amazon " width="32" height="11"/>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buyLinks[1].url}" target="_blank" rel="noopener noreferrer nofollow">
            <img class="shopping-list-applebook-img" src="${appleBookIcon}" alt="logo-applebook " width="16" height="16" />
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buyLinks[2].url}" target="_blank" rel="noopener noreferrer nofollow">
            <img class="shopping-list-bookshop-img" src="${bookShopIcon}" alt="logo-bookshop " width="16"
  height="16" />
                
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete">
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
    !e.target.classList.contains("icon-delete-button") &&
    !e.target.closest("button.button-delete")
  ) {
    return;
  }

  const deleteBook = e.target.closest(`.shopping-list-card`);

  const deleteBookName = deleteBook.dataset.title;

  let data = getDataLocalStorage();

  const deleteBookStorage = data.find(
    ({ bookName }) => bookName === deleteBookName
  );

  const indexDeleteBook = data.findIndex(
    (el) => el.bookName === deleteBookName
  );

  const newArray = data.splice(indexDeleteBook, 1);

  dataChangeLocalstorage(`shoppingList`, data);

  createMarkup(data);
}
