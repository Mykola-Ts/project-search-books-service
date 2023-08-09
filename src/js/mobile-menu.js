// MOBILE MENU
const refs = {
    burger: document.querySelector(".js-open-menu"),
    containerMobMenu: document.querySelector('.header-nav-menu'),
    body:document.querySelector('body'),
    signUpBtn:document.querySelector('button[data-login-button]'),
    authBackdrop:document.querySelector('div[data-modal]'),
}

refs.burger.addEventListener('click', openAndCloseMenu)
refs.signUpBtn.addEventListener('click', hiddenMobileMenu)

function openAndCloseMenu (evt) {
    const expanded = refs.burger.getAttribute('aria-expanded') === 'true'|| false 
    refs.burger.classList.toggle('is-open')
    refs.burger.setAttribute('aria-expanded', !expanded)

    refs.containerMobMenu.classList.toggle('is-open')
    refs.containerMobMenu.classList.remove('hidden')

    if(refs.containerMobMenu.classList.contains('is-open')){
        refs.body.style.overflow = 'hidden'
    }else{
        refs.body.style.overflow = 'visible'
    }
}

function hiddenMobileMenu () {
    refs.containerMobMenu.classList.add('hidden')
    
}