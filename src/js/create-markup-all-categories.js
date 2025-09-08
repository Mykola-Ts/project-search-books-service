import placeholderCoverBook from '../img/placeholder-cover-book.png';

export function createCategoriesListMarkup(categories = []) {
  return `
    <li class="category-list-item all-categories-list-item current-category">
      <a
        href="#"
        class="category-list-link all-category-link link"
        data-name="top-books"
        aria-label="All categories books"
        >All categories</a
      >
    </li>

    ${categories
      .map(({ list_name }) =>
        list_name
          ? `
        <li class="category-list-item">
          <a
            href="#"
            class="category-list-link link"
            data-name="${list_name}"
            aria-label="Category books"
            >${list_name}</a
          >
        </li>`
          : ''
      )
      .join('')}`;
}

export function createMarkupOpenCategoryTitle(categoryName) {
  const wordsCategoryTitle = categoryName.split(' ');
  let categoryTitle = categoryName;
  let categoryTitleItem = '';

  if (wordsCategoryTitle.length > 1) {
    categoryTitle = wordsCategoryTitle.slice(0, -1).join(' ');
    categoryTitleItem = wordsCategoryTitle.slice(-1).join(' ');
  }

  return `
    <h2 class="open-category-title">
    ${categoryTitle}
    <span class="open-category-title-item">${categoryTitleItem}</span>
    </h2>
  `;
}

export function createBookMarkup(books = []) {
  return books
    .map(
      ({ _id, title, book_image, author }) =>
        `
          <li
            data-id="${_id}"
            class="books-list-item books-list-item-category"
          >
            <a href="#" class="book-item-link link" aria-label="Book ${title}">
              <div class="book-img-wrap-item">
                <img
                  src="${book_image || placeholderCoverBook}"
                  alt="${title}"
                  width="335"
                  height="485"
                  loading="lazy"
                  class="book-item-img"
                />
                <p class="book-overley">quick view</p>
              </div>
              <div class="book-item-descr">
                <h3 class="book-item-title">${title}</h3>
                <p class="book-item-author">by ${author}</p>
              </div></a
            >
          </li>`
    )
    .join('');
}

export function createBestSellerListMarkup(bestSellers = []) {
  const markupBestSellersList = createBookMarkup(
    bestSellers.map(({ books }) => books[0]).slice(0, 5)
  );

  return `
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
}

export function createCategoryMarkup(books = []) {
  return books
    .map(({ books, list_name }) => {
      if (!list_name) return '';

      return `
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
    })
    .join('');
}
