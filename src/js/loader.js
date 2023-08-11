// LOADER

export function showLoader(selectorContainer) {
  selectorContainer.classList.add('loader');
}

export function hideLoader(selectorContainer) {
  selectorContainer.classList.remove('loader');
}
