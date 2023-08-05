// LOADER
//додає книжку лоадер в центр контейнера, потрібно вказати селектор контейнера
export function showLoader(selectorContainer) {
    selectorContainer.style.display = "flex";
    selectorContainer.style.justifyContent = 'center';
    selectorContainer.style.alignItems = 'center';
    selectorContainer.innerHTML = '<span class="loader"></span>'
}

//видаляє те що додала функція шоу, потрібно вказати той самий контейнер, після цього треба вставити відмалювання вмісту
export function hideLoader(selectorContainer) {
    selectorContainer.removeAttribute('style');
    selectorContainer.innerHTML = '';
}