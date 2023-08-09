import * as firebaseService from './firebase-services';
import * as header from './header';
import * as mobileMenu from './mobile-menu';
import * as supportUkraine from './support-ukraine';
import * as pagination from './pagination';
import * as loader from './loader';
import * as scrollUp from './scroll-up';

// SHOPPING LIST
// import FirebaseService from './firebase-services';

// const firebaseService = new FirebaseService();

// const shoppinglist = document.querySelector('.shopping-list');
const shoppinglistContainer = document.querySelector('.shopping-list-container');
const btnDeletebook = document.querySelector('.shopping-list');

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
    // firebaseService.addDataToDb(key, 'books', value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}

// localStorage.clear();

// -----------------

// Рабочий код

if(document.location.href === "http://localhost:5173/shopping-list.html"){
  document.addEventListener("DOMContentLoaded", createShoppingList);
  btnDeletebook.addEventListener(`click`, onDeleteBook);
}




function createShoppingList(e) {
  // console.log("DOM fully loaded and parsed");
  e.preventDefault();
  // if (!e.target.classList.contains(`shoppinglist`)) {
  //     console.log(`no delete`);
  //     return;
  // }
  // const page = e.target.closest(`.header-nav-list`);
  // console.log(`yes`);
  let data = getDataLocalStorage();
  // console.log(data);
  createMarkup(data);
}

function getDataLocalStorage() {
  const savedData = localStorage.getItem(`shoppingList`);
  let parsedData = [];
  return (parsedData = JSON.parse(savedData));
}

function createMarkup(data) {
  // blockSupportUkraine.innerHTML = '<div class="shopping-list-support-ukraine"> Support UKraine</div>'
  shoppinglistContainer.innerHTML = `
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `;
  // let data = getData();
  // console.log(data);

  if (data.length != 0) {
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
            <a class="shop-link" href="${el.buyLinks[0].url}">
            <img class="shopping-list-amazon-img" src="./img/amazon-icon.png" alt="logo-amazon " width="32" height="11"/>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buyLinks[1].url}">
            <img class="shopping-list-applebook-img" src="./img/apple-book-icon.png" alt="logo-aapplebook " width="16" height="16" />
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buyLinks[4].url}">
            <img class="shopping-list-applebook-img" src="./img/book-shop-icon.png" alt="logo-aapplebook " width="16"
  height="16" />
                
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete">
        <svg class="icon-delete-button" width="16" height="16">
            <use href="./img/trash-icon.svg#icon-trash-icon"></use>
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
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"/>
        </div>
        `;
  }
}


// if(document.location.href === "http://localhost:5173/shopping-list.html"){
//   btnDeletebook.addEventListener(`click`, onDeleteBook);
// }



function onDeleteBook(e) {
  e.preventDefault();
  console.log(e.target);
  if (!e.target.classList.contains(`icon-delete-button`)) {
    console.log(`no delete`);
    return;
  }
  console.log(` delete`);
 
  const deleteBook = e.target.closest(`.shopping-list-card`);
  console.log(deleteBook);
  const deleteBookName = deleteBook.dataset.title;
  console.log(deleteBookName);
  let data = getDataLocalStorage();
  console.log(data);

  const deleteBookStorage = data.find(({ bookName }) => bookName === deleteBookName);
  console.log(deleteBookStorage);

  const indexDeleteBook = data.findIndex((el) => el.bookName === deleteBookName);
  console.log(indexDeleteBook);

  const newArray = data.splice(indexDeleteBook, 1);

  console.log(data);

  dataChangeLocalstorage(`shoppingList`, data);

  createMarkup(data);
}

// export { dataChangeLocalstorage };


