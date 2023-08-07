// All categories
const API_URL = 'https://books-backend.p.goit.global/books';
const defaultCategory = 'all categories';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    console.error('Error request data:', error);
    return null;
  }
}
async function fetchCategoryData(categoryName) {
  return await fetchData(`/category?category=${categoryName}`);
}

function createCategoryElement(list_name) {
  const category = document.createElement('div');
  category.className = 'category';
  category.dataset.category = list_name;
  category.textContent = list_name;

  category.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach(cat => {
      cat.classList.remove('selected-category');
    });
    category.classList.add('selected-category');

    if (list_name !== defaultCategory) {
      updateMainTitle(list_name);
      displayBooksByCategory(list_name);
    } else {
      updateMainTitle('Best Sellers Books');
      displayAllBlock();
    }
  });

  if (list_name === defaultCategory) {
    category.click();
  }

  return category;
}

function createBookCard({ book_image, title, author, description }) {
  const bookCard = document.createElement('div');
  bookCard.className = 'book';
  bookCard.innerHTML = `
    <img src="${book_image}" alt="${title}">
    <div class="quick-view">
        <p>${description}</p>
    </div>
    <h3 class="book-title">${title}</h3>
    <p class="book-author">by ${author}</p>
    `;
  return bookCard;
}

function createCategoryBooksBlock(categoryName, books) {
  const block = document.createElement('div');
  block.className = 'category-books';

  const categoryHeader = document.createElement('div');
  categoryHeader.className = 'category-header';

  const headerText =
    categoryName === defaultCategory ? 'Best Sellers Books' : categoryName;
  categoryHeader.innerHTML = `<h2 class="category-title">${headerText}</h2>`;

  const categoryContent = document.createElement('div');
  categoryContent.className = 'category-content';
  books.forEach(book => categoryContent.appendChild(createBookCard(book)));

  const seeMoreButton = document.createElement('button');
  seeMoreButton.className = 'see-more';
  seeMoreButton.textContent = 'SEE MORE';
  seeMoreButton.addEventListener('click', () =>
    displayBooksByCategory(categoryName)
  );

  block.appendChild(categoryHeader);
  block.appendChild(categoryContent);
  block.appendChild(seeMoreButton);
  return block;
}

async function displayBooksByCategory(category) {
  updateMainTitle(category);
  const booksDiv = document.getElementById('books');
  booksDiv.innerHTML = 'Loading...';
  const books = await fetchData(`/category?category=${category}`);

  if (!books || !Array.isArray(books)) {
    booksDiv.innerHTML = 'Failed to fetch books or no books available.';
    return;
  }

  booksDiv.innerHTML = '';
  books.forEach(book => booksDiv.appendChild(createBookCard(book)));
}

async function displayAllBlock() {
  updateMainTitle(defaultCategory);
  const categories = document.querySelectorAll('.category');
  const booksDiv = document.getElementById('books');
  booksDiv.innerHTML = '';
  for (const category of categories) {
    const categoryName = category.textContent;
    if (categoryName === defaultCategory) continue;
    const books = await fetchData(`/category?category=${categoryName}`);

    if (!books || !Array.isArray(books)) {
      console.error('Failed to fetch books for category:', categoryName);
      continue;
    }

    booksDiv.appendChild(
      createCategoryBooksBlock(categoryName, books.slice(0, 5))
    );
  }
}

function updateMainTitle(categoryName) {
  const titleElement = document.querySelector('.title-category');
  let words =
    categoryName === defaultCategory ? 'Best Sellers Books' : categoryName;
  words = words.split(' ');
  const lastWord = words.pop();
  titleElement.innerHTML = `${words.join(
    ' '
  )} <span class="title-category-span">${lastWord}</span>`;
}

async function fetchAndDisplayCategories() {
  const categoriesData = await fetchData('/top-books');
  const categoryList = document.getElementById('categoryList');
  categoryList.appendChild(createCategoryElement(defaultCategory));
  categoriesData.forEach(({ list_name }) =>
    categoryList.appendChild(createCategoryElement(list_name))
  );
  displayAllBlock();
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayCategories);

export { fetchCategoryData };
