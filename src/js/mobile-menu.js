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

    if(refs.containerMobMenu.classList.contains('is-open')){
        refs.body.style.overflow = 'hidden'
    }else{
        refs.body.style.overflow = 'visible'
    }
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
refs.header.classList.toggle('dark-theme')
refs.closeMobMenu.classList.toggle('dark-theme')
if(!refs.closeMobMenu.classList.contains('dark-theme')){
    refs.closeMobMenu.classList.add('light-theme')
}else{refs.closeMobMenu.classList.remove('light-theme')}

}