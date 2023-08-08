// MOBILE MENU
const refs = {
    btnMobMenu: document.querySelector(".mobile-menu-btn"),
    containerMobMenu: document.querySelector('.mobile-menu_container'),
    body:document.querySelector('body'),
}

refs.btnMobMenu.addEventListener('click', openAndCloseMenu)

function openAndCloseMenu (evt) {
    const expanded = refs.btnMobMenu.getAttribute('aria-expanded') === 'true'|| false 
    refs.btnMobMenu.classList.toggle('is-open')
    refs.btnMobMenu.setAttribute('aria-expanded', !expanded)

    refs.containerMobMenu.classList.toggle('is-open')

    if(refs.containerMobMenu.classList.contains('is-open')){
        refs.body.style.overflow = 'hidden'
    }else{
        refs.body.style.overflow = 'visible'
    }
}