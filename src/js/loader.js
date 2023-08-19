// LOADER

export const showLoader = function showLoader(selectorContainer) {
  selectorContainer.classList.add('loader');
};

export const hideLoader = function hideLoader(selectorContainer) {
  selectorContainer.classList.remove('loader');
};
