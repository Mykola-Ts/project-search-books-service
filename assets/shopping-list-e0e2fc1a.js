(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function l(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=l(o);fetch(o.href,s)}})();const i={slider:document.querySelector(".slider"),sliderList:document.querySelector(".slider-list"),sliderItem:document.querySelectorAll(".slider-item"),btnNext:document.querySelector(".slider-btn-next"),btnPrev:document.querySelector(".slider-btn-prev")};let c=0,b=52;i.btnNext.addEventListener("click",p);function p(){c+=1,k(),i.slider.clientHeight===188?c>=i.sliderItem.length-4&&(g(i.btnNext),d(i.btnPrev),i.btnNext.removeEventListener("click",p),i.btnPrev.addEventListener("click",onClickPrev)):i.slider.clientHeight===292&&c>=i.sliderItem.length-6&&(g(i.btnNext),d(i.btnPrev),i.btnNext.removeEventListener("click",p),i.btnPrev.addEventListener("click",onClickPrev))}function k(){i.sliderList.style.transform=`translateY(${-c*b}px)`}function d(t){t.style.display="block"}function g(t){t.style.display="none"}const a=document.querySelector(".shopping-list-container"),h=document.querySelector(".shopping-list");if(document.location.href==="http://localhost:5173/shopping-list.html"){const t=document.querySelector(".header-nav-link-home"),e=document.querySelector(".header-nav-link-shoppinglist");t.classList.remove("current-page"),e.classList.add("current-page")}function v(t,e){try{const l=JSON.stringify(e);firebaseService.addDataToDb(t,"books",e),localStorage.setItem(t,l)}catch(l){console.error("Set state error: ",l.message)}}document.location.href==="http://localhost:5173/shopping-list.html"&&(document.addEventListener("DOMContentLoaded",y),h.addEventListener("click",f));function y(t){t.preventDefault();let e=u();m(e)}function u(){const t=localStorage.getItem("shoppingList");return JSON.parse(t)}function m(t){a.innerHTML=`
    <h2 class="shopping-list-title-part1 ">Shopping <span class="shopping-list-title-part2">List</span></h2>
    `,t.length!=0?a.innerHTML+=t.map(e=>`
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
    `).join(""):a.innerHTML+=`
        <div class="empty-shopping-list">
        <p class="shopping-list-text-empty">This page is empty, add some books and proceed to order.</p>
        <img class="shopping-list-empty-img" src="./img/empty-shopping-list.png" alt="empty list " width="265"/>
        </div>
        `}document.location.href==="http://localhost:5173/shopping-list.html"&&h.addEventListener("click",f);function f(t){if(t.preventDefault(),console.log(t.target),!t.target.classList.contains("icon-delete-button")){console.log("no delete");return}console.log(" delete");const e=t.target.closest(".shopping-list-card");console.log(e);const l=e.dataset.title;console.log(l);let n=u();console.log(n);const o=n.find(({bookName:r})=>r===l);console.log(o);const s=n.findIndex(r=>r.bookName===l);console.log(s),n.splice(s,1),console.log(n),v("shoppingList",n),m(n)}
