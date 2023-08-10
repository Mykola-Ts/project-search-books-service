// SHOPPING LIST

// const shoppinglist = document.querySelector('.shopping-list');
import shoppingListEmptyImg from '../../src/img/empty-shopping-list.png';
import amazonIcon from '../../src/img/amazon-icon.png';
import appleBookIcon from '../../src/img/apple-book-icon.png';
import bookShopIcon from '../../src/img/book-shop-icon.png';
import iconsSvg from '../../src/img/icons.svg'

document.addEventListener('DOMContentLoaded', createShoppingList);

const headerNavLinkHome = document.querySelector('.header-nav-link-home');
const headerNavLinkShoppingList = document.querySelector(
  '.header-nav-link-shoppinglist'
);

// Для тестирования - получение и загрузка данных в localStorage.
// После загрузки данных , нужно закоментировать.
// function getBooks() {
//     return fetch(`https://books-backend.p.goit.global/books/category?category=Series Books`)
//         .then((response) => {
//         if (!response.ok) {
//         throw new Error(response.statusText)
//         }
//             const dataBook = response.json();
//         return dataBook;
//         })
// };
// getBooks();
// function addToLocalstorage() {
//     getBooks().then(dataBook => {
//         let book = dataBook;
//         dataChangeLocalstorage(`project`, book);
//     })
// }
// addToLocalstorage();

function dataChangeLocalstorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

// localStorage.clear();

// -----------------

// Рабочий код

function createShoppingList(e) {
  if (!e.target.location.pathname.includes('/shopping-list.html')) {
    return;
  }

  headerNavLinkHome.classList.remove('current-page');
  headerNavLinkShoppingList.classList.add('current-page');

  const shoppinglistContainer = document.querySelector(
    '.shopping-list-container'
  );

  // if (!e.target.classList.contains(`shoppinglist`)) {
  //     console.log(`no delete`);
  //     return;
  // }
  // const page = e.target.closest(`.header-nav-list`);
  // console.log(`yes`);
  let data = getDataLocalStorage();
  // console.log(data);
  createMarkup(data);

  const btnDeletebook = document.querySelector('.shopping-list');

  if (btnDeletebook) {
    btnDeletebook.addEventListener(`click`, onDeleteBook);
  }
}

function getDataLocalStorage() {
  const savedData = localStorage.getItem(`shoppingList`);
  let parsedData = [];
  return (parsedData = JSON.parse(savedData));
}

function createMarkup(data) {
  const shoppinglistContainer = document.querySelector(
    '.shopping-list-container'
  );
  // blockSupportUkraine.innerHTML = '<div class="shopping-list-support-ukraine"> Support UKraine</div>'
  shoppinglistContainer.innerHTML = `
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `;
  // let data = getData();
  // console.log(data);

  if (data.length != 0) {
    shoppinglistContainer.innerHTML += data
      .map(
        el => `
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
            <img class="shopping-list-applebook-img" src="${appleBookIcon}" alt="logo-aapplebook " width="16" height="16" />
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buyLinks[2].url}" target="_blank" rel="noopener noreferrer nofollow">
            <img class="shopping-list-applebook-img" src="${bookShopIcon}" alt="logo-aapplebook " width="16"
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
  } else {
    shoppinglistContainer.innerHTML += `
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="${shoppingListEmptyImg}" alt="empty list " width="265"/>
        </div>
        `;
  }
}

function onDeleteBook(e) {
  if (!e.target.classList.contains(`icon-delete-button`)) {
    return;
  }

  const deleteBook = e.target.closest(`.shopping-list-card`);

  const deleteBookName = deleteBook.dataset.title;

  let data = getDataLocalStorage();

  const deleteBookStorage = data.find(
    ({ bookName }) => bookName === deleteBookName
  );

  const indexDeleteBook = data.findIndex(el => el.bookName === deleteBookName);

  console.log(indexDeleteBook);

  const newArray = data.splice(indexDeleteBook, 1);

  dataChangeLocalstorage(`shoppingList`, data);

  createMarkup(data);
}

// export { dataChangeLocalstorage };
