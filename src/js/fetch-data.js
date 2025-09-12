import axios from 'axios';
import { errorMessageText } from './helpers';

const API_URL = 'https://books-backend.p.goit.global/books';

export async function fetchData(endpoint = '') {
  const response = await axios.get(`${API_URL}${endpoint}`);

  if (response.status !== 200) throw new Error(errorMessageText);

  return response.data;
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

export async function fetchBookById(id) {
  return await fetchData(`/${id}`);
}
