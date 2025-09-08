import { Notify } from 'notiflix';
import { hideLoader, showLoader } from './loader';
import { openBookModal } from './modal-window';
import { errorMessageText } from './helpers';
import {
  fetchBestSellers,
  fetchBooksByCategory,
  fetchCategories,
} from './fetch-data';
import {
  createBestSellerListMarkup,
  createBookMarkup,
  createCategoriesListMarkup,
  createCategoryMarkup,
  createMarkupOpenCategoryTitle,
} from './create-markup-all-categories';

const selectors = {
  body: document.querySelector('body'),
  categoryList: document.querySelector('.category-list'),
  header: document.querySelector('.header'),
  home: document.querySelector('.home'),
  bestSellers: document.querySelector('.best-sellers'),
  bestSellersWrap: document.querySelector('.best-sellers-wrap'),
  loader: document.querySelector('.loader-wrap'),
  booksListWrap: document.querySelector('.books-list-wrap'),
  booksList: document.querySelector('.books-list'),
  openCategoryBooks: document.querySelector('.open-category-books'),
};
const allTopBooksByCategories = [];

document.addEventListener('DOMContentLoaded', createBookList);

function createBookList(evt) {
  if (evt.target.location.pathname.includes('/shopping-list.html')) return;

  createCategoriesList();
  createTopBookList();
}

async function createCategoriesList() {
  showLoader(selectors.loader);

  try {
    const categoriesData = (await fetchCategories()) || [];
    const markupCategoryList = createCategoriesListMarkup(categoriesData);

    selectors.categoryList.innerHTML = markupCategoryList;
    selectors.allCategoryLink = document.querySelector('.all-category-link');
    selectors.categoryList.addEventListener('click', onChangeCategory);
  } catch (error) {
    Notify.failure(errorMessageText);
  } finally {
    hideLoader(selectors.loader);
  }
}

function createBestSellers(bestSellers = []) {
  bestSellers = filterUniqueBooks(bestSellers.flatMap(({ books }) => books));

  const markupBooks = createBookMarkup(bestSellers);

  selectors.openCategoryBooks.innerHTML = `
          <h2 class="open-category-title">
            Best Sellers<span class="open-category-title-item"> Books</span>
          </h2>
          <ul class="open-category-list books-list-by-category">
            ${markupBooks}
          </ul>`;
}

async function createTopBookList() {
  try {
    const topBooks = (await fetchBestSellers()) || [];
    const uniqueBooks = filterUniqueBooksBycategories(topBooks);
    allTopBooksByCategories.push(...uniqueBooks);

    selectors.bestSellersWrap.innerHTML =
      createBestSellerListMarkup(uniqueBooks);
    selectors.booksList.innerHTML = createCategoryMarkup(uniqueBooks);

    selectors.booksListWrap.classList.remove('visually-hidden');

    selectors.booksListWrap.addEventListener('click', onChangeCategory);
  } catch (error) {
    Notify.failure(errorMessageText);
  }
}

async function onChangeCategory(evt) {
  const target = evt.target;

  try {
    if (target.classList.contains('see-more-btn-best-sellers')) {
      return await onBestSellersClick();
    } else if (target.classList.contains('all-category-link')) {
      return onAllCategoriesClick();
    } else if (
      (!target.classList.contains('category-list-link') &&
        !target.classList.contains('see-more-btn')) ||
      target.classList.contains('all-category-link') ||
      target.classList.contains('see-more-btn-best-sellers')
    ) {
      return;
    }

    await onCategoryClick(target.dataset.name);
  } catch (error) {
    Notify.failure(errorMessageText);
  } finally {
    hideLoader(selectors.loader);
  }
}

async function onBestSellersClick() {
  showLoader(selectors.loader);

  try {
    const bestSellers = (await fetchBestSellers()) || [];

    createBestSellers(bestSellers);
    updateBookListView();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no books matching your search query. Please try again.'
    );
  } finally {
    hideLoader(selectors.loader);
  }
}

function onAllCategoriesClick() {
  selectors.openCategoryBooks.classList.add('visually-hidden');
  selectors.booksListWrap.classList.remove('visually-hidden');
  selectors.booksListWrap.classList.remove('books-list-preview');

  changeCurrentCategoryListLink('top-books');

  selectors.booksListWrap.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  selectors.bestSellers.classList.remove('visually-hidden');
  selectors.booksListWrap.classList.add('books-list-preview');
}

async function onCategoryClick(categoryName) {
  if (!categoryName) return;

  changeCurrentCategoryListLink(categoryName);

  const books = (await fetchBooksByCategory(categoryName)) || [];

  if (!books.length) {
    books.push(
      ...allTopBooksByCategories.find(
        ({ list_name }) => list_name === categoryName
      )?.books
    );
  }

  const markup = createBookMarkup(filterUniqueBooks(books));

  selectors.openCategoryBooks.innerHTML = `
      ${createMarkupOpenCategoryTitle(categoryName)}
      <ul class="open-category-list books-list-by-category">
        ${markup}
      </ul>`;

  updateBookListView();
}

function changeCurrentCategoryListLink(category) {
  document
    .querySelector('.current-category')
    ?.classList.remove('current-category');

  const changeCurrentCategory = document.querySelector(
    `[data-name="${category}"]`
  );
  changeCurrentCategory.classList.add('current-category');
}

function updateBookListView() {
  selectors.booksListWrap.classList.add('visually-hidden');
  selectors.openCategoryBooks.classList.remove('visually-hidden');

  selectors.openCategoryBooks.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  selectors.openCategoryBooks.addEventListener('click', openBookModal);
}

function filterUniqueBooksBycategories(allBooks = []) {
  return allBooks.map(({ books, list_name }) => {
    return {
      list_name,
      books: books.filter(
        (book, idx, arr) =>
          arr.findIndex(({ title }) => book.title === title) === idx
      ),
    };
  });
}

function filterUniqueBooks(allBooks = []) {
  return allBooks.filter(
    (book, idx, arr) =>
      arr.findIndex(({ title }) => book.title === title) === idx
  );
}
