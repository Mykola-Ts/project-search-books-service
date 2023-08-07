(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();document.querySelector(".shopping-list");const h=document.querySelector(".btn-to-list"),g=document.querySelector(".shopping-list-support-ukraine"),l=document.querySelector(".shopping-list-container");function c(){return fetch("https://books-backend.p.goit.global/books/category?category=Series Books").then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})}c();function u(){c().then(t=>{a("project",t)})}u();function a(t,e){try{const r=JSON.stringify(e);localStorage.setItem(t,r)}catch(r){console.error("Set state error: ",r.message)}}h.addEventListener("click",f);function f(t){t.preventDefault();let e=p();d(e)}function p(){const t=localStorage.getItem("project");return JSON.parse(t)}function d(t){g.innerHTML='<div class="shopping-list-support-ukraine"> Support UKraine</div>',l.innerHTML=`
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
        `}const m=document.querySelector(".shopping-list");m.addEventListener("click",y);function y(t){if(t.preventDefault(),console.log(t.target),!t.target.classList.contains("icon-delete-button"))return;const r=t.target.closest(".shopping-list-card").dataset.title;let i=p();const s=i.find(({title:n})=>n===r);console.log(s);const o=i.findIndex(n=>n.title===r);console.log(o),i.splice(o,1),console.log(i),a("project",i),d(i)}
