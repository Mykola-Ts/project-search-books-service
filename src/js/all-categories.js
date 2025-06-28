import placeholderCoverBook from '../img/placeholder-cover-book.png';
import { Notify } from 'notiflix';
import { hideLoader, showLoader } from './loader';
import { openBookModal } from './modal-window';
import { errorMessageText } from './helpers';

const API_URL = 'https://books-backend.p.goit.global/books';
const selectors = {
  body: document.querySelector('body'),
  categoryList: document.querySelector('.category-list'),
  header: document.querySelector('.header'),
  home: document.querySelector('.home'),
  bestSellers: document.querySelector('.best-sellers'),
  loader: document.querySelector('.loader-wrap'),
  booksListWrap: document.querySelector('.books-list-wrap'),
  booksList: document.querySelector('.books-list'),
  openCategoryBooksList: document.querySelector('.open-category-books-list'),
};
const categoriesBook = [];

document.addEventListener('DOMContentLoaded', createBookList);

function createBookList(evt) {
  if (evt.target.location.pathname.includes('/shopping-list.html')) return;

  showLoader(selectors.loader);
  selectors.loader.classList.add('common-loader');

  createCategories();
}

async function createCategories() {
  try {
    const categoriesData = await fetchData('/category-list');
    const markupCategoryList =
      `
    <li class="category-list-item all-categories-list-item current-category">
      <a
        href="#"
        class="category-list-link all-category-link link"
        data-name="top-books"
        aria-label="All categories books"
        >All categories</a
      >
    </li>` + createCategoryListMarkup(categoriesData);

    selectors.categoryList.innerHTML = markupCategoryList;
    selectors.allCategoryLink = document.querySelector('.all-category-link');
    selectors.categoryList.addEventListener('click', onChangeCategory);

    categoriesData.forEach(({ list_name }) => {
      categoriesBook.push(list_name);
    });

    await fetchTopBooks();
  } catch (error) {
    Notify.failure(errorMessageText);
  }
}

async function fetchTopBooks() {
  try {
    const topBooksData = await fetchData('/top-books');
    const markupBestSellersList = createBookMarkup(
      topBooksData.map(({ books }) => books[0]).slice(0, 5)
    );

    selectors.bestSellers.insertAdjacentHTML = `
      <ul class="best-sellers-list books-list-by-category">
       ${markupBestSellersList}
      </ul>
     <button
       type="button"
       class="see-more-btn see-more-btn-best-sellers"
       aria-label="See more best sellers books"
     >
       SEE MORE
     </button>`;

    const categoryMarkup = createCategoryMarkup(topBooksData);

    selectors.booksList.innerHTML = categoryMarkup;
    selectors.booksListWrap.addEventListener('click', onChangeCategory);
  } catch (error) {
    Notify.failure(errorMessageText);
  } finally {
    selectors.booksList.classList.remove('visually-hidden');
  }
}

async function onChangeCategory(evt) {
  try {
    if (evt.target.classList.contains('see-more-btn-best-sellers')) {
      await onBestSellersClick();

      return;
    } else if (evt.target.classList.contains('all-category-link')) {
      onAllCategoriesClick();
      selectors.bestSellers.classList.remove('visually-hidden');

      return;
    } else if (
      (!evt.target.classList.contains('category-list-link') &&
        !evt.target.classList.contains('see-more-btn')) ||
      evt.target.classList.contains('all-category-link') ||
      evt.target.classList.contains('see-more-btn-best-sellers')
    ) {
      return;
    }

    await onCategoryClick(evt.target.dataset.name);

    selectors.bestSellers.classList.add('visually-hidden');
  } catch (error) {
    Notify.failure(errorMessageText);
  } finally {
    hideLoader(selectors.loader);
    selectors.loader.classList.remove('common-loader');
  }
}

async function onBestSellersClick() {
  showLoader(selectors.loader);
  selectors.loader.classList.add('common-loader');

  try {
    const data = await fetchData('/top-books');
    let markup = '';

    data.map(({ books }) => (markup += createBookMarkup(books.slice(0, 3))));

    selectors.openCategoryBooksList.innerHTML = `
      <h2 class="open-category-title">
        Best Sellers<span class="open-category-title-item"> Books</span>
      </h2>
      <ul class="open-category-list books-list-by-category">
        ${markup}
      </ul>`;

    updateBookListView();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no books matching your search query. Please try again.'
    );
  } finally {
    hideLoader(selectors.loader);
    selectors.loader.classList.remove('common-loader');
  }
}

function onAllCategoriesClick() {
  showLoader(selectors.loader);
  selectors.loader.classList.add('common-loader');

  selectors.booksList.classList.remove('visually-hidden');
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
}

async function onCategoryClick(categoryName) {
  showLoader(selectors.loader);
  selectors.loader.classList.add('common-loader');

  changeCurrentCategory(categoryName);

  const data = await fetchData(`/category?category=${categoryName}`);
  const markup = createBookMarkup(data);

  const wordsCategoryTitle = categoryName.split(' ');
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

  selectors.openCategoryBooksList.innerHTML = `
    <h2 class="open-category-title">
     ${categoryTitle}<span class="open-category-title-item">
       ${categoryTitleItem}</span
      >
    </h2>
    <ul class="open-category-list books-list-by-category">
      ${markup}
    </ul>`;

  updateBookListView();
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
        `
        <li class="category-list-item">
          <a
            href="#"
            class="category-list-link link"
            data-name="${list_name}"
            aria-label="Category books"
            >${list_name}</a
          >
        </li>`
    )
    .join('');
}

function createCategoryMarkup(arr) {
  return arr
    .map(({ books, list_name }) => {
      const markup = `
        <li class="books-list-category" data-id="${list_name}">
          <h3 class="books-category-title">${list_name}</h3>
          <ul class="books-list-by-category">
            ${createBookMarkup(books)}
          </ul>
          <button
            type="button"
            class="see-more-btn"
            data-name="${list_name}"
            aria-label="See more books by category ${list_name}"
          >
            SEE MORE
          </button>
        </li>`;

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
        `
          <li
            data-id="${book._id}"
            class="books-list-item books-list-item-category"
          >
            <a href="#" class="book-item-link link" aria-label="Book ${
              book.title
            }">
              <div class="book-img-wrap-item">
                <img
                  src="${book.book_image || placeholderCoverBook}"
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
                <p class="book-item-author">by ${book.author}</p>
              </div></a
            >
          </li>`
    )
    .join('');
}

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) throw new Error(errorMessageText);

  return response.json();
}

function updateBookListView() {
  const booksListItem = document.querySelectorAll('.books-list-item');

  booksListItem.forEach(item =>
    item.classList.remove('books-list-item-category')
  );

  document
    .querySelectorAll('.books-list-item')
    .forEach(item => item.classList.remove('books-list-item-category'));

  selectors.booksList.classList.add('visually-hidden');
  selectors.openCategoryBooksList.classList.remove('visually-hidden');

  selectors.openCategoryBooksList.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  selectors.openCategoryBooksList.addEventListener('click', openBookModal);
}
