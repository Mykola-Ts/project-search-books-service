(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();document.addEventListener("DOMContentLoaded",g);const c=document.querySelector(".header-nav-link-home"),p=document.querySelector(".header-nav-link-shoppinglist");function d(o,i){try{const e=JSON.stringify(i);localStorage.setItem(o,e)}catch(e){console.error("Set state error: ",e.message)}}function g(o){if(!o.target.location.pathname.includes("/shopping-list.html"))return;c.classList.remove("current-page"),p.classList.add("current-page"),document.querySelector(".shopping-list-container"),o.preventDefault();let i=l();r(i);const e=document.querySelector(".shopping-list");e&&e.addEventListener("click",h)}function l(){const o=localStorage.getItem("shoppingList");return JSON.parse(o)}function r(o){const i=document.querySelector(".shopping-list-container");i.innerHTML=`
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `,o.length!=0?i.innerHTML+=o.map(e=>`
    <div class="shopping-list-card" data-title="${e.bookName}">
    
    <img class="shopping-list-card-img" src="${e.bookImage}" alt="book image" />
    
    <div class="shopping-list-card-data">

    <h3 class="shopping-list-card-title">${e.bookName}</h3>
    <p class="shopping-list-card-category">${e.listName}</p>
    <p class="shopping-list-card-description">${e.description}</p>
    <div class="shopping-list-card-wrap">
    <p class="shopping-list-card-author">${e.bookAuthor}</p>
    <ul class="shopping-list-card-linkshop">
        <li class="shop-item" >
            <a class="shop-link" href="${e.buyLinks[0].url}">
            <img class="shopping-list-amazon-img" src="./img/amazon-icon.png" alt="logo-amazon " width="32" height="11"/>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${e.buyLinks[1].url}">
            <img class="shopping-list-applebook-img" src="./img/apple-book-icon.png" alt="logo-aapplebook " width="16" height="16" />
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${e.buyLinks[4].url}">
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
    `).join(""):i.innerHTML+=`
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"/>
        </div>
        `}function h(o){if(o.preventDefault(),!o.target.classList.contains("icon-delete-button"))return;const e=o.target.closest(".shopping-list-card").dataset.title;let n=l();n.find(({bookName:s})=>s===e);const t=n.findIndex(s=>s.bookName===e);console.log(t),n.splice(t,1),d("shoppingList",n),r(n)}
