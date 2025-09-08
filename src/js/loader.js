export const showLoader = function showLoader(selectorContainer) {
  selectorContainer.classList.add('loader');
  selectorContainer.classList.add('common-loader');
};

export const hideLoader = function hideLoader(selectorContainer) {
  selectorContainer.classList.remove('loader');
  selectorContainer.classList.remove('common-loader');
};
