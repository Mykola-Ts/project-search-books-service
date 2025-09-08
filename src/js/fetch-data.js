const API_URL = 'https://books-backend.p.goit.global/books';

export async function fetchData(endpoint = '') {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) throw new Error(errorMessageText);

  return response.json();
}

export async function fetchCategories() {
  return await fetchData('/category-list');
}

export async function fetchBestSellers() {
  return await fetchData('/top-books');
}

export async function fetchBooksByCategory(categoryName) {
  return await fetchData(`/category?category=${categoryName}`);
}
