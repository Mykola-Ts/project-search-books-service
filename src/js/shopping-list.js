// SHOPPING LIST
const shoppinglist = document.querySelector(`.shopping-list`);
const bnttolist = document.querySelector(`.btn-to-list`);


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
        local(`project`, book);
        // const addBook = JSON.stringify(book);
        // localStorage.setItem(`project`, book);

        
    })
}

addToLocalstorage();

function local(key, value) {
    try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
    } catch (error) {
    console.error("Set state error: ", error.message);
    }
};

// localStorage.clear();
function getData() {
    const savedData = localStorage.getItem(`project`);
    let parsedData = [];
    return parsedData = JSON.parse(savedData);
    console.log(parsedData[2]);
};
// const markup = `<h3 class="shopping-list-card-title">${el.title}</h3>`;
function doMarkup() {
    shoppinglist.innerHTML =`<h2 class="shopping-list-title-part1">Shopping <span class="shopping-list-title-part2">List</span></h2>`
    // let data = [];
    let data = getData();
    console.log(data);

    if (data.length != 0) {
        shoppinglist.innerHTML += data.map(el => `
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
                    <use href="./symbol-defs-shop-icons.svg#icon-amazon"></use>
                </svg>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buy_links[1].url}">
                <svg class="shop-icon" width="16" height="16">
                    <use href="./symbol-defs-shop-icons.svg#icon-applebooks"></use>
                </svg>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${el.buy_links[4].url}">
                <svg class="shop-icon"   width="16" height="16">
                    <use href="./symbol-defs-shop-icons.svg#icon-bookshop"></use>
                </svg>
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete">
        <svg class="icon-delete-button" width="16" height="16">
            <use href="./trash-03.svg"></use>
        </svg>
    </button>
    </div>
    `).join(``)
        
 
        
        
        
    }
    
    else {
        shoppinglist.innerHTML += `
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./empty-shoppinglist.jpg" alt="empty list " width="265"
            height="198" />
    </div>
        `
    }


    }
    

doMarkup();


const btnDeletebook = document.querySelector(`.shopping-list`);
        btnDeletebook.addEventListener(`click`, onDeleteBook);
function onDeleteBook(e) {
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
    let data = getData();
    console.log(data);

    const deleteBookStorage = data.find(({ title }) => title === deleteBookName);
    console.log(deleteBookStorage);

    const indexBook = data.findIndex(el => el.title === deleteBookName);
    console.log(indexBook);

    const newArray = data.splice(indexBook, 1);

    console.log(data);

    local(`project`, data);

    doMarkup();

}  
