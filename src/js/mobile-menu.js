// MOBILE MENU
const refs = {
    burger: document.querySelector(".js-open-menu"),
    containerMobMenu: document.querySelector('.header-nav-menu'),
    body:document.querySelector('body'),
    signUpBtn:document.querySelector('button[data-login-button]'),
    authBackdrop:document.querySelector('div[data-modal]'),
    themeSwitch: document.querySelector('.theme-switch-toggle'),
    header: document.querySelector('.header'),
    closeMobMenu:document.querySelector('.menu-close'),
}

refs.burger.addEventListener('click', openAndCloseMenu)
refs.signUpBtn.addEventListener('click', hiddenMobileMenu)
refs.themeSwitch.addEventListener('click', darkTheme)

function openAndCloseMenu (evt) {
    const expanded = refs.burger.getAttribute('aria-expanded') === 'true'|| false 
    refs.burger.classList.toggle('is-open')
    refs.burger.setAttribute('aria-expanded', !expanded)

    refs.containerMobMenu.classList.toggle('is-open')
    refs.containerMobMenu.classList.remove('hidden')

}


function hiddenMobileMenu () {
    

    refs.containerMobMenu.classList.remove('is-open')
    const expanded = refs.burger.getAttribute('aria-expanded') === 'true'|| false 
    refs.burger.classList.remove('is-open')
    refs.burger.setAttribute('aria-expanded', !expanded)
    refs.containerMobMenu.classList.add('hidden')
    if(expanded){

    }
}

function darkTheme () {
    refs.closeMobMenu.classList.toggle('dark-theme')
    if(refs.closeMobMenu.classList.contains('dark-theme')){
            refs.closeMobMenu.classList.remove('mobile-light-theme')
        }
refs.header.classList.toggle('dark-theme')


}