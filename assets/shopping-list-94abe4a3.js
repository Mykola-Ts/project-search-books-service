(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const l={LIGHT:"light-theme",DARK:"dark-theme"},d=document.body,f=document.querySelector(".header"),L=document.querySelector(".theme-switch-toggle");L.addEventListener("change",S);M();function S(e){e.currentTarget.checked?(d.classList.add(l.DARK),d.classList.remove(l.LIGHT),localStorage.setItem("currentTheme",l.DARK)):(d.classList.add(l.LIGHT),d.classList.remove(l.DARK),f.classList.remove(l.DARK),localStorage.setItem("currentTheme",l.LIGHT))}function M(){const e=localStorage.getItem("currentTheme");e?(d.classList.add(e),e===l.DARK&&(L.checked=!0)):(d.classList.add(l.LIGHT),f.classList.add(l.LIGHT),localStorage.setItem("currentTheme",l.LIGHT))}const c={btnMobMenu:document.querySelector(".mobile-menu-btn"),containerMobMenu:document.querySelector(".mobile-menu_container"),body:document.querySelector("body")};c.btnMobMenu.addEventListener("click",N);function N(e){const s=c.btnMobMenu.getAttribute("aria-expanded")==="true"||!1;c.btnMobMenu.classList.toggle("is-open"),c.btnMobMenu.setAttribute("aria-expanded",!s),c.containerMobMenu.classList.toggle("is-open"),c.containerMobMenu.classList.contains("is-open")?c.body.style.overflow="hidden":c.body.style.overflow="visible"}const o={slider:document.querySelector(".slider"),sliderList:document.querySelector(".slider-list"),sliderItem:document.querySelectorAll(".slider-item"),btnNext:document.querySelector(".slider-btn-next"),btnPrev:document.querySelector(".slider-btn-prev")};let p=0,T=52;o.btnNext.addEventListener("click",u);function u(){p+=1,v(),o.slider.clientHeight===188?p>=o.sliderItem.length-4&&(b(o.btnNext),m(o.btnPrev),o.btnNext.removeEventListener("click",u),o.btnPrev.addEventListener("click",h)):o.slider.clientHeight===292&&p>=o.sliderItem.length-6&&(b(o.btnNext),m(o.btnPrev),o.btnNext.removeEventListener("click",u),o.btnPrev.addEventListener("click",h))}function h(){p-=1,v(),p===0&&(m(o.btnNext),b(o.btnPrev),o.btnPrev.removeEventListener("click",h),o.btnNext.addEventListener("click",u))}function v(){o.sliderList.style.transform=`translateY(${-p*T}px)`}function m(e){e.style.display="block"}function b(e){e.style.display="none"}const g=document.querySelector(".js-btn-up");g.classList.add("is-hidden");window.addEventListener("scroll",()=>{window.scrollY>20?g.classList.remove("is-hidden"):g.classList.add("is-hidden")});g.addEventListener("click",()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})});document.addEventListener("DOMContentLoaded",q);const I=document.querySelector(".header-nav-link-home"),x=document.querySelector(".header-nav-link-shoppinglist");function D(e,s){try{const t=JSON.stringify(s);firebaseService.addDataToDb(e,"books",s),localStorage.setItem(e,t)}catch(t){console.error("Set state error: ",t.message)}}function q(e){if(!e.target.location.pathname.includes("/shopping-list.html"))return;I.classList.remove("current-page"),x.classList.add("current-page"),document.querySelector(".shopping-list-container"),e.preventDefault();let s=y();k(s);const t=document.querySelector(".shopping-list");t&&t.addEventListener("click",w)}function y(){const e=localStorage.getItem("shoppingList");return JSON.parse(e)}function k(e){const s=document.querySelector(".shopping-list-container");s.innerHTML=`
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `,e.length!=0?s.innerHTML+=e.map(t=>`
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
    `).join(""):s.innerHTML+=`
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"/>
        </div>
        `}function w(e){if(e.preventDefault(),console.log(e.target),!e.target.classList.contains("icon-delete-button")){console.log("no delete");return}console.log(" delete");const s=e.target.closest(".shopping-list-card");console.log(s);const t=s.dataset.title;console.log(t);let r=y();console.log(r);const n=r.find(({bookName:a})=>a===t);console.log(n);const i=r.findIndex(a=>a.bookName===t);console.log(i),r.splice(i,1),console.log(r),D("shoppingList",r),k(r)}export{M as c};
