(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();document.querySelector(".shopping-list");const h=document.querySelector(".btn-to-list"),g=document.querySelector(".shopping-list-support-ukraine"),l=document.querySelector(".shopping-list-container");function a(){return fetch("https://books-backend.p.goit.global/books/category?category=Series Books").then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})}a();function u(){a().then(t=>{c("project",t)})}u();function c(t,e){try{const n=JSON.stringify(e);localStorage.setItem(t,n)}catch(n){console.error("Set state error: ",n.message)}}h.addEventListener("click",f);function f(t){t.preventDefault();let e=p();d(e)}function p(){const t=localStorage.getItem("project");return JSON.parse(t)}function d(t){g.innerHTML='<div class="shopping-list-support-ukraine"> Support UKraine</div>',l.innerHTML=`
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `,t.length!=0?l.innerHTML+=t.map(e=>`
    
    <div class="shopping-list-card" data-title="${e.title}">
    
    <img class="shopping-list-card-img" src="${e.book_image}" alt="book image" />
    
    <div class="shopping-list-card-data">

    <h3 class="shopping-list-card-title">${e.title}</h3>
    <p class="shopping-list-card-category">${e.list_name}</p>
    <p class="shopping-list-card-description">${e.description}</p>
    <div class="shopping-list-card-wrap">
    <p class="shopping-list-card-author">${e.author}</p>
    <ul class="shopping-list-card-linkshop">
        <li class="shop-item" >
            <a class="shop-link" href="${e.buy_links[0].url}">
                <svg class="shop-icon" width="32" height="11">
                <rect x="5" y="5" width="32" height="11"/>
                    <use href=""></use>
                </svg>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${e.buy_links[1].url}">
                <svg class="shop-icon" width="16" height="16">
                <rect x="5" y="5" width="16" height="16"/>
                    <use href=""></use>
                </svg>
            </a>
        </li>
        <li class="shop-item">
            <a class="shop-link" href="${e.buy_links[4].url}">
                <svg class="shop-icon"   width="16" height="16">
                <rect x="5" y="5" width="16" height="16"/>
                    <use href=""></use>
                </svg>
            </a>
        </li>
        </ul>
        </div>
    </div>
    <button type="button" class="button-delete">
        <svg class="icon-delete-button" width="16" height="16">
            <use href=""></use>
        </svg>
    </button>
    </div>
    `).join(""):l.innerHTML+=`
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"
        </div>
        `}const m=document.querySelector(".shopping-list");m.addEventListener("click",k);function k(t){if(t.preventDefault(),console.log(t.target),!t.target.classList.contains("icon-delete-button"))return;const n=t.target.closest(".shopping-list-card").dataset.title;let i=p();const o=i.find(({title:r})=>r===n);console.log(o);const s=i.findIndex(r=>r.title===n);console.log(s),i.splice(s,1),console.log(i),c("project",i),d(i)}
