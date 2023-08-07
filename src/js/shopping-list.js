// SHOPPING LIST
const shoppinglist = document.querySelector(`.shopping-list`);
const shoppinglistContainer = document.querySelector(`.shopping-list-container`);
const clickToShoppingList = document.querySelector(`.header-nav-container`);
const btnDeletebook = document.querySelector(`.shopping-list`);

// Для тестирования - получение и загрузка данных в localStorage.
// После загрузки данных , нужно закоментировать.
function getBooks() {
    return fetch(`https://books-backend.p.goit.global/books/category?category=Series Books`)
        .then((response) => {
        if (!response.ok) {
        throw new Error(response.statusText)
        }
            const dataBook = response.json();
        return dataBook;
        })
};
getBooks();
function addToLocalstorage() {
    getBooks().then(dataBook => {
        let book = dataBook;
        dataChangeLocalstorage(`project`, book);
    })
}
addToLocalstorage();



// localStorage.clear();

// -----------------

// Рабочий код


clickToShoppingList.addEventListener(`click`, createShoppingList);
btnDeletebook.addEventListener(`click`, onDeleteBook);

function createShoppingList(e) {
    e.preventDefault();
    console.log(e.target);
    if (!e.target.classList.contains(`shoppinglist`)) {
        console.log(`no delete`);
        return;
    }
    // const page = e.target.closest(`.header-nav-list`);
    console.log(`yes`);
    let data = getDataLocalStorage();
    console.log(data);

    createMarkup(data);
    
}

function onDeleteBook(e) {
    e.preventDefault();
    // console.log(e.target);
    
    if (!e.target.classList.contains(`icon-delete-button`)) {
        // console.log(`no delete`);
        return;
    }
    // console.log(` delete`);
    const deleteBook = e.target.closest(`.shopping-list-card`);
    // console.log(deleteBook);
    const deleteBookName = deleteBook.dataset.title;
    // console.log(deleteBookName);
    let data = getDataLocalStorage();
    // console.log(data);

    const deleteBookStorage = data.find(({ title }) => title === deleteBookName);
    console.log(deleteBookStorage);

    const indexDeleteBook = data.findIndex(el => el.title === deleteBookName);
    console.log(indexDeleteBook);

    const newArray = data.splice(indexDeleteBook, 1);

    console.log(data);

    dataChangeLocalstorage(`project`, data);

    createMarkup(data);

}  

function getDataLocalStorage() {
    const savedData = localStorage.getItem(`project`);
    let parsedData = [];
    return parsedData = JSON.parse(savedData);
};


function createMarkup(data) {
    console.log(`markup`);
    // blockSupportUkraine.innerHTML = '<div class="shopping-list-support-ukraine"> Support UKraine</div>'
    shoppinglistContainer.innerHTML = `
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `
    // let data = getDataLocalStorage();
    // console.log(data);

    if (data.length != 0) {
        shoppinglistContainer.innerHTML += data.map(el => `
    <div class="shopping-list-card" data-title="${el.title}">
    
    <img class="shopping-list-card-img" src="${el.book_image}" alt="book image" />
    
    <div class="shopping-list-card-data">

    <h3 class="shopping-list-card-title">${el.title}</h3>
    <p class="shopping-list-card-category">${el.list_name}</p>
    <p class="shopping-list-card-description">${el.description}</p>
    <div class="shopping-list-card-wrap">
    <p class="shopping-list-card-author">${el.author}</p>
    <ul class="shopping-list-card-linkshop">
        <li class="shop-item" >
            <a class="shop-link" href="${el.buy_links[0].url}">
                <svg class="shop-icon" width="32" height="11">
                <rect x="5" y="5" width="32" height="11"/>
                    <use href=""></use>
                </svg>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buy_links[1].url}">
                <svg class="shop-icon" width="16" height="16">
                <rect x="5" y="5" width="16" height="16"/>
                    <use href=""></use>
                </svg>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buy_links[4].url}">
                <svg class="shop-icon"   width="16" height="16">
                <rect x="5" y="5" width="16" height="16"/>
                    <use href=""></use>
                </svg>
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete">
        <svg class="icon-delete-button" width="16" height="16">
            <use href=""></use>
        </svg>
    </button>
    </div>
    `).join(``)
    }
    else {
        shoppinglistContainer.innerHTML += `
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"
        </div>
        `
    }
    }
    

function dataChangeLocalstorage(key, value) {
    try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
    } catch (error) {
    console.error("Set state error: ", error.message);
    }
};

