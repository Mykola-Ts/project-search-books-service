// All categories

import axios from 'axios';
import { showLoader } from './loader';
import { hideLoader } from './loader';
import { openBookModal } from './modal-window';
import { Notify } from 'notiflix';
import notiflixSettings from './notiflix-settings';

const API_URL = 'https://books-backend.p.goit.global/books';

const selectors = {
  body: document.querySelector('body'),
  categoryList: document.querySelector('.category-list'),
  header: document.querySelector('.header'),
  home: document.querySelector('.home'),
  bestSellers: document.querySelector('.best-sellers'),
  loader: document.querySelector('.loader-wrap'),
  booksListWrap: document.querySelector('.books-list-wrap'),
  openCategoryBooksList: document.querySelector('.open-category-books-list'),
};
const categoriesBook = [];

document.addEventListener('DOMContentLoaded', createBookList);

function createBookList(evt) {
  if (evt.target.location.pathname.includes('/shopping-list.html')) {
    return;
  }

  showLoader(selectors.loader);

  selectors.loader.classList.add('common-loader');

  createCategories();
}

function createCategories() {
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
          Notify.failure(
            `Oops, something went wrong. Try reloading the page. Here's the error message: ${error.message}`
          );
        });

      fetchBooksByCategory(categoriesBook).then(data => {
        const markup = createCategoryMarkup(data);

        const booksList = document.querySelector('.books-list');
        booksList.innerHTML = markup;

        selectors.booksListWrap.addEventListener('click', onClickCategory);
      });
    })
    .catch(error => {
      Notify.failure(
        `Oops, something went wrong. Try reloading the page. Here's the error message: ${error.message}`
      );
    })
    .finally(() => {
      selectors.booksListWrap.classList.remove('visually-hidden');
    });
}

async function onClickCategory(evt) {
  if (evt.target.classList.contains('see-more-btn-best-sellers')) {
    showLoader(selectors.loader);
    selectors.loader.classList.add('common-loader');

    fetchData('/top-books')
      .then(data => {
        let markup = '';

        data.map(
          ({ books }) => (markup += createBookMarkup(books.slice(0, 3)))
        );

        selectors.openCategoryBooksList.innerHTML = `<h2 class="open-category-title">Best Sellers<span class="open-category-title-item"> Books</span></h2><ul class="open-category-list books-list-by-category">${markup}</ul>`;

        const booksListItem = document.querySelectorAll('.books-list-item');
        booksListItem.forEach(item =>
          item.classList.remove('books-list-item-category')
        );

        document
          .querySelectorAll('.books-list-item')
          .forEach(item => item.classList.remove('books-list-item-category'));

        selectors.booksListWrap.classList.add('visually-hidden');
        selectors.openCategoryBooksList.classList.remove('visually-hidden');

        selectors.openCategoryBooksList.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        selectors.openCategoryBooksList.addEventListener(
          'click',
          openBookModal
        );
      })
      .catch(error => {
        Notify.failure(
          'Sorry, there are no books matching your search query. Please try again.'
        );
      })
      .finally(() => {
        hideLoader(selectors.loader);
        selectors.loader.classList.remove('common-loader');
      });

    return;
  }
  
  if (evt.target.classList.contains('all-category-link')) {
    showLoader(selectors.loader);
    selectors.loader.classList.add('common-loader');

    selectors.booksListWrap.classList.remove('visually-hidden');
    selectors.openCategoryBooksList.classList.add('visually-hidden');

    changeCurrentCategory('top-books');

    document
      .querySelectorAll('.books-list-item')
      .forEach(item => item.classList.add('books-list-item-category'));

    selectors.booksListWrap.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    hideLoader(selectors.loader);
    selectors.loader.classList.remove('common-loader');

    return;
  }

  if (
    (!evt.target.classList.contains('category-list-link') &&
      !evt.target.classList.contains('see-more-btn')) ||
    evt.target.classList.contains('all-category-link') ||
    evt.target.classList.contains('see-more-btn-best-sellers')
  ) {
    return;
  }

  try {
    showLoader(selectors.loader);
    selectors.loader.classList.add('common-loader');

    changeCurrentCategory(evt.target.dataset.name);

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

    selectors.openCategoryBooksList.innerHTML = `<h2 class="open-category-title">${categoryTitle}<span class="open-category-title-item"> ${categoryTitleItem}</span></h2><ul class="open-category-list books-list-by-category">${markup}</ul>`;

    const booksListItem = document.querySelectorAll('.books-list-item');
    booksListItem.forEach(item =>
      item.classList.remove('books-list-item-category')
    );

    selectors.booksListWrap.classList.add('visually-hidden');
    selectors.openCategoryBooksList.classList.remove('visually-hidden');

    selectors.openCategoryBooksList.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    selectors.openCategoryBooksList.addEventListener('click', openBookModal);
  } catch (error) {
    Notify.failure(
      `Oops, something went wrong. Try reloading the page. Here's the error message: ${error.message}`
    );
  }

  hideLoader(selectors.loader);
  selectors.loader.classList.remove('common-loader');
}

function changeCurrentCategory(datasetName) {
  if (document.querySelector('.current-category')) {
    const currentCategory = document.querySelector('.current-category');

    currentCategory.classList.remove('current-category');
  }

  const changeCurrentCategory = document.querySelector(
    `[data-name="${datasetName}"]`
  );
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
    <button type="button" class="see-more-btn" data-name="${
      categoriesBook[idCategory]
    }">SEE MORE</button>
    </li>`;

      idCategory += 1;

      hideLoader(selectors.loader);
      selectors.loader.classList.remove('common-loader');

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

  if (!data.length) {
    throw new Error(
      'Sorry, there are no books matching your search query. Please try again.'
    );
  }

  return data;
}

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
}
