// LOADER
//додає книжку лоадер в стилі контейнеру
export function showLoader(selectorContainer) {
  selectorContainer.classList.add('loader');
}

//видаляє стиль лоадеру з контейнеру
export function hideLoader(selectorContainer) {
  selectorContainer.classList.remove('loader');
}
