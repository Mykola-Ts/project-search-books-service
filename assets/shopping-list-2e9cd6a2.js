(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const i={LIGHT:"light-theme",DARK:"dark-theme"},a=document.body,k=document.querySelector(".header"),h=document.querySelector(".theme-switch-toggle");h.addEventListener("change",S);I();function S(e){e.currentTarget.checked?(a.classList.add(i.DARK),a.classList.remove(i.LIGHT),localStorage.setItem("currentTheme",i.DARK)):(a.classList.add(i.LIGHT),a.classList.remove(i.DARK),k.classList.remove(i.DARK),localStorage.setItem("currentTheme",i.LIGHT))}function I(){switch(localStorage.getItem("currentTheme"),localStorage.getItem("currentTheme")){case i.LIGHT:a.classList.add(i.LIGHT),a.classList.remove(i.DARK),h.checked=!1;break;case i.DARK:a.classList.remove(i.LIGHT),a.classList.add(i.DARK),h.checked=!0;break;default:a.classList.add(i.LIGHT),localStorage.setItem("currentTheme",i.LIGHT);break}}const r={burger:document.querySelector(".js-open-menu"),containerMobMenu:document.querySelector(".header-nav-menu"),body:document.querySelector("body"),signUpBtn:document.querySelector("button[data-login-button]"),authBackdrop:document.querySelector("div[data-modal]")};r.burger.addEventListener("click",N);r.signUpBtn.addEventListener("click",T);function N(e){const n=r.burger.getAttribute("aria-expanded")==="true"||!1;r.burger.classList.toggle("is-open"),r.burger.setAttribute("aria-expanded",!n),r.containerMobMenu.classList.toggle("is-open"),r.containerMobMenu.classList.remove("hidden"),r.containerMobMenu.classList.contains("is-open")?r.body.style.overflow="hidden":r.body.style.overflow="visible"}function T(){r.containerMobMenu.classList.add("hidden")}const o={slider:document.querySelector(".slider"),sliderList:document.querySelector(".slider-list"),sliderItem:document.querySelectorAll(".slider-item"),btnNext:document.querySelector(".slider-btn-next"),btnPrev:document.querySelector(".slider-btn-prev")};let p=0,q=52;o.btnNext.addEventListener("click",u);function u(){p+=1,L(),o.slider.clientHeight===188?p>=o.sliderItem.length-4&&(f(o.btnNext),b(o.btnPrev),o.btnNext.removeEventListener("click",u),o.btnPrev.addEventListener("click",m)):o.slider.clientHeight===292&&p>=o.sliderItem.length-6&&(f(o.btnNext),b(o.btnPrev),o.btnNext.removeEventListener("click",u),o.btnPrev.addEventListener("click",m))}function m(){p-=1,L(),p===0&&(b(o.btnNext),f(o.btnPrev),o.btnPrev.removeEventListener("click",m),o.btnNext.addEventListener("click",u))}function L(){o.sliderList.style.transform=`translateY(${-p*q}px)`}function b(e){e.style.display="block"}function f(e){e.style.display="none"}const g=document.querySelector(".js-btn-up");g.classList.add("is-hidden");window.addEventListener("scroll",()=>{window.scrollY>20?g.classList.remove("is-hidden"):g.classList.add("is-hidden")});g.addEventListener("click",()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})});document.addEventListener("DOMContentLoaded",D);const M=document.querySelector(".header-nav-link-home"),w=document.querySelector(".header-nav-link-shoppinglist");function x(e,n){try{const t=JSON.stringify(n);localStorage.setItem(e,t)}catch(t){console.error("Set state error: ",t.message)}}function D(e){if(!e.target.location.pathname.includes("/shopping-list.html"))return;M.classList.remove("current-page"),w.classList.add("current-page"),document.querySelector(".shopping-list-container"),e.preventDefault();let n=v();y(n);const t=document.querySelector(".shopping-list");t&&t.addEventListener("click",H)}function v(){const e=localStorage.getItem("shoppingList");return JSON.parse(e)}function y(e){const n=document.querySelector(".shopping-list-container");n.innerHTML=`
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `,e.length!=0?n.innerHTML+=e.map(t=>`
    <div class="shopping-list-card" data-title="${t.bookName}">
    
    <img class="shopping-list-card-img" src="${t.bookImage}" alt="book image" />
    
    <div class="shopping-list-card-data">

    <h3 class="shopping-list-card-title">${t.bookName}</h3>
    <p class="shopping-list-card-category">${t.listName}</p>
    <p class="shopping-list-card-description">${t.description}</p>
    <div class="shopping-list-card-wrap">
    <p class="shopping-list-card-author">${t.bookAuthor}</p>
    <ul class="shopping-list-card-linkshop">
        <li class="shop-item" >
            <a class="shop-link" href="${t.buyLinks[0].url}">
            <img class="shopping-list-amazon-img" src="./img/amazon-icon.png" alt="logo-amazon " width="32" height="11"/>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${t.buyLinks[1].url}">
            <img class="shopping-list-applebook-img" src="./img/apple-book-icon.png" alt="logo-aapplebook " width="16" height="16" />
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${t.buyLinks[4].url}">
            <img class="shopping-list-applebook-img" src="./img/book-shop-icon.png" alt="logo-aapplebook " width="16"
  height="16" />
                
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete">
        <svg class="icon-delete-button" width="16" height="16">
            <use href="./img/trash-icon.svg#icon-trash-icon"></use>
        </svg>
    </button>
    </div>
    `).join(""):n.innerHTML+=`
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"/>
        </div>
        `}function H(e){if(e.preventDefault(),console.log(e.target),!e.target.classList.contains("icon-delete-button")){console.log("no delete");return}console.log(" delete");const n=e.target.closest(".shopping-list-card");console.log(n);const t=n.dataset.title;console.log(t);let c=v();console.log(c);const s=c.find(({bookName:d})=>d===t);console.log(s);const l=c.findIndex(d=>d.bookName===t);console.log(l),c.splice(l,1),console.log(c),x("shoppingList",c),y(c)}export{I as c};
