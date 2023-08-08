// All categories

import axios from 'axios';
import { showLoader } from './loader';
import { hideLoader } from './loader';

const API_URL = 'https://books-backend.p.goit.global/books';

const selectors = {
  body: document.querySelector('body'),
  categoryList: document.querySelector('.category-list'),
  header: document.querySelector('.header'),
  home: document.querySelector('.home'),
  bestSellers: document.querySelector('.best-sellers'),
  loader: document.querySelector('.loader-wrap'),
  booksListWrap: document.querySelector('.books-list-wrap'),
};
const categoriesBook = [];

selectors.home.style.topMargin = getTopMargin(selectors.home);

showLoader(selectors.loader);
selectors.loader.classList.add('common-loader');

fetchData('/category-list')
  .then(data => {
    const markupCategoryList = `<li class="category-list-item all-categories-list-item current-category"><a href="#" class="category-list-link all-category-link link" data-name="top-books">All categories</a></li>${createCategoryListMarkup(
      data
    )}`;

    selectors.categoryList.innerHTML = markupCategoryList;

    selectors.allCategoryLink = document.querySelector('.all-category-link');

    selectors.categoryList.addEventListener('click', onClickCategory);

    data.map(({ list_name }) => {
      categoriesBook.push(list_name);
    });

    fetchData('/top-books')
      .then(data => {
        const markupBestSellersList = createBookMarkup(
          data.map(({ books }) => books[0]).slice(0, 5)
        );

        selectors.bestSellers.innerHTML = `
        <h2 class="best-sellers-title">Best Sellers <span class="best-sellers-title-item">Books</span></h2>
        <ul class="best-sellers-list books-list-by-category">${markupBestSellersList}</ul>
        <button type="button" class="see-more-btn see-more-btn-best-sellers">SEE MORE</button>`;
      })
      .catch(error => {
        console.error('Error request data:', error);
      });

    fetchBooksByCategory(categoriesBook)
      .then(data => {
        const markup = createCategoryMarkup(data);

        const booksList = document.querySelector('.books-list');
        booksList.innerHTML = markup;

        selectors.booksListWrap.addEventListener('click', onClickCategory);
      })
      .catch(error => {
        console.error('Error request data:', error);
      });
  })
  .catch(error => {
    console.error('Error request data:', error);
  })
  .finally(() => {
    hideLoader(selectors.loader);
    selectors.loader.classList.remove('common-loader');
    selectors.booksListWrap.classList.remove('visually-hidden');
  });

async function onClickCategory(evt) {
  if (
    !evt.target.classList.contains('category-list-link')&& !evt.target.classList.contains('see-more-btn') ||
    evt.target.classList.contains('all-category-link') ||
    evt.target.classList.contains('see-more-btn-best-sellers')
  ) {
    return;
  }

  try {

    changeCurrentCategory(evt.target.dataset.name)

    const data = await fetchData(
      `/category?category=${evt.target.dataset.name}`
    );
    const markup = createBookMarkup(data);

    const wordsCategoryTitle = evt.target.dataset.name.split(' ');
    let categoryTitle;
    let categoryTitleItem;

    if (wordsCategoryTitle.length > 1) {
      categoryTitle = wordsCategoryTitle
        .slice(0, wordsCategoryTitle.length - 1)
        .join(' ');
      categoryTitleItem = wordsCategoryTitle
        .slice(wordsCategoryTitle.length - 1)
        .join(' ');
    }

    selectors.booksListWrap.innerHTML = `<h2 class="open-category-title">${categoryTitle}<span class="open-category-title-item"> ${categoryTitleItem}</span></h2><ul class="open-category-list books-list-by-category">${markup}</ul>`;

    const booksListItem = document.querySelectorAll('.books-list-item');
    booksListItem.forEach(item =>
      item.classList.remove('books-list-item-category')
    );

    selectors.booksListWrap.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  } catch (error) {
    console.error('Error request data:', error);
  }
}

function changeCurrentCategory(datasetName){
  if(document.querySelector('.current-category')){
    const currentCategory = document.querySelector('.current-category');
    
    currentCategory.classList.remove('current-category');
  }

  const changeCurrentCategory = document.querySelector(`[data-name="${datasetName}"]`)
  changeCurrentCategory.classList.add('current-category');
}

function createCategoryListMarkup(arr) {
  return arr
    .map(
      ({ list_name }) =>
        `<li class="category-list-item"><a href="#" class="category-list-link link" data-name="${list_name}">${list_name}</a></li>`
    )
    .join('');
}

function createCategoryMarkup(arr) {
  let idCategory = 0;

  return arr
    .map(({ value }) => {
      const markup = `<li class="books-list-category" data-id="${
        categoriesBook[idCategory]
      }">
    <h3 class="books-category-title">${categoriesBook[idCategory]}</h3>
    <ul class="books-list-by-category">
    ${createBookMarkup(value.slice(0, 5))}
    </ul>
    <button type="button" class="see-more-btn" data-name="${categoriesBook[idCategory]}">SEE MORE</button>
    </li>`;

      idCategory += 1;

      return markup;
    })
    .join('');
}

function createBookMarkup(arr) {
  return arr
    .map(
      book =>
        `<li data-id="${book._id}" class="books-list-item books-list-item-category">
        <a href="#" class="book-item-link link">
        <div class="book-img-wrap-item">
        <img
          src="${book.book_image}"
          alt="${book.title}"
          width="335"
          height="485"
          loading="lazy"
          class="book-item-img"
        />
        <p class="book-overley">quick view</p>
      </div>
<div class="book-item-descr">
<h3 class="book-item-title">${book.title}</h3>
<p class="book-item-author">by ${book.author}</p></div></a>
      </li>`
    )
    .join('');
}

function getTopMargin(element) {
  const { height } = selectors.header.getBoundingClientRect();

  const margin = Math.ceil(height);

  element.style.marginTop = `${margin}px`;
}

async function fetchBooksByCategory(categoriesBook) {
  const arrOfPromises = categoriesBook.map(async category => {
    const resp = await axios.get(`${API_URL}/category?category=${category}`);

    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }

    return resp.data;
  });

  const data = (await Promise.allSettled(arrOfPromises)).filter(
    ({ status }) => status === 'fulfilled'
  );

  // if (!data.length) {
  //   throw new Error(resp.statusText);
  // }

  return data;
}

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
}




// // All categories
// const API_URL = 'https://books-backend.p.goit.global/books';
// const defaultCategory = 'all categories';

// async function fetchData(endpoint) {
//   try {
//     const response = await fetch(`${API_URL}${endpoint}`);
//     if (!response.ok) throw new Error(response.statusText);
//     return await response.json();
//   } catch (error) {
//     console.error('Error request data:', error);
//     return null;
//   }
// }
// async function fetchCategoryData(categoryName) {
//   return await fetchData(`/category?category=${categoryName}`);
// }

// function createCategoryElement(list_name) {
//   const category = document.createElement('div');
//   category.className = 'category';
//   category.dataset.category = list_name;
//   category.textContent = list_name;

//   category.addEventListener('click', () => {
//     document.querySelectorAll('.category').forEach(cat => {
//       cat.classList.remove('selected-category');
//     });
//     category.classList.add('selected-category');

//     if (list_name !== defaultCategory) {
//       updateMainTitle(list_name);
//       displayBooksByCategory(list_name);
//     } else {
//       updateMainTitle('Best Sellers Books');
//       displayAllBlock();
//     }
//   });

//   if (list_name === defaultCategory) {
//     category.click();
//   }

//   return category;
// }

// function createBookCard({ book_image, title, author, description }) {
//   const bookCard = document.createElement('div');
//   bookCard.className = 'book';
//   bookCard.innerHTML = `
//     <img src="${book_image}" alt="${title}">
//     <div class="quick-view">
//         <p>${description}</p>
//     </div>
//     <h3 class="book-title">${title}</h3>
//     <p class="book-author">by ${author}</p>
//     `;
//   return bookCard;
// }

// function createCategoryBooksBlock(categoryName, books) {
//   const block = document.createElement('div');
//   block.className = 'category-books';

//   const categoryHeader = document.createElement('div');
//   categoryHeader.className = 'category-header';

//   const headerText =
//     categoryName === defaultCategory ? 'Best Sellers Books' : categoryName;
//   categoryHeader.innerHTML = `<h2 class="category-title">${headerText}</h2>`;

//   const categoryContent = document.createElement('div');
//   categoryContent.className = 'category-content';
//   books.forEach(book => categoryContent.appendChild(createBookCard(book)));

//   const seeMoreButton = document.createElement('button');
//   seeMoreButton.className = 'see-more';
//   seeMoreButton.textContent = 'SEE MORE';
//   seeMoreButton.addEventListener('click', () =>
//     displayBooksByCategory(categoryName)
//   );

//   block.appendChild(categoryHeader);
//   block.appendChild(categoryContent);
//   block.appendChild(seeMoreButton);
//   return block;
// }

// async function displayBooksByCategory(category) {
//   updateMainTitle(category);
//   const booksDiv = document.getElementById('books');
//   booksDiv.innerHTML = 'Loading...';
//   const books = await fetchData(`/category?category=${category}`);

//   if (!books || !Array.isArray(books)) {
//     booksDiv.innerHTML = 'Failed to fetch books or no books available.';
//     return;
//   }

//   booksDiv.innerHTML = '';
//   books.forEach(book => booksDiv.appendChild(createBookCard(book)));
// }

// async function displayAllBlock() {
//   updateMainTitle(defaultCategory);
//   const categories = document.querySelectorAll('.category');
//   const booksDiv = document.getElementById('books');
//   booksDiv.innerHTML = '';
//   for (const category of categories) {
//     const categoryName = category.textContent;
//     if (categoryName === defaultCategory) continue;
//     const books = await fetchData(`/category?category=${categoryName}`);

//     if (!books || !Array.isArray(books)) {
//       console.error('Failed to fetch books for category:', categoryName);
//       continue;
//     }

//     booksDiv.appendChild(
//       createCategoryBooksBlock(categoryName, books.slice(0, 5))
//     );
//   }
// }

// function updateMainTitle(categoryName) {
//   const titleElement = document.querySelector('.title-category');
//   let words =
//     categoryName === defaultCategory ? 'Best Sellers Books' : categoryName;
//   words = words.split(' ');
//   const lastWord = words.pop();
//   titleElement.innerHTML = `${words.join(
//     ' '
//   )} <span class="title-category-span">${lastWord}</span>`;
// }

// async function fetchAndDisplayCategories() {
//   const categoriesData = await fetchData('/top-books');
//   const categoryList = document.getElementById('categoryList');
//   categoryList.appendChild(createCategoryElement(defaultCategory));
//   categoriesData.forEach(({ list_name }) =>
//     categoryList.appendChild(createCategoryElement(list_name))
//   );
//   displayAllBlock();
// }

// document.addEventListener('DOMContentLoaded', fetchAndDisplayCategories);

// export { fetchCategoryData };