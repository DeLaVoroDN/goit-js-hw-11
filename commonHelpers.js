import{S as p,i as c}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function m(i){const r={KEYWORD:"nature",IMAGE_TYPE:"photo",SAFESEARCH:"true",ORIENTATION:"horizontal",API_KEY:"42695738-6b8e09c0e47bd53fa68e0735a",URL:"https://pixabay.com/api/"},t=`${r.URL}?key=${r.API_KEY}&q=${i}&image_type=${r.IMAGE_TYPE}&safesearch=${r.SAFESEARCH}&orientation=${r.ORIENTATION}`;return fetch(t).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()}).then(s=>{if(s&&s.hits)return s})}function y(i){const r=document.querySelector(".list");if(!r){console.error("Gallery element not found");return}const t=i.hits.slice(0,9);r.innerHTML=t.map(({webformatURL:s,largeImageURL:e,tags:o,likes:n,views:u,comments:d,downloads:f})=>`
        <li class="gallery-item">
          <div class="gallery-box item-card-wrapper">
            <a class="gallery-link" href="${e}">
              <img class="gallery-img" src="${s}" alt="${o}" loading="lazy">
            </a>
            <div class="card-box">
              <div>
                <p class="card-box-text"><b>Likes</b></p>
                <p class="card-box-text">${n}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Views</b></p>
                <p class="card-box-text">${u}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Comments</b></p>
                <p class="card-box-text">${d}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Downloads</b></p>
                <p class="card-box-text">${f}</p>
              </div>
            </div>
          </div>
        </li>`).join("")}const g="/goit-js-hw-11/assets/octagon-8fe9c699.svg",h=new p(".gallery a",{captionsData:"alt",captionDelay:250}),a=document.querySelector(".form");document.querySelector(".list");const l=document.querySelector(".loader");a.addEventListener("submit",b);l.style.display="none";function b(i){i.preventDefault();const r=a.elements.query.value.trim();if(r===""){c.warning({message:"Please enter a search query.",messageColor:"black",backgroundColor:"#ffac26",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3});return}l.style.display="block",m(r).then(t=>{if(t&&t.hits&&t.hits.length>0)return t}).then(t=>{y(t),h.refresh()}).catch(t=>c.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",iconUrl:g,pauseOnHover:!1,progressBarColor:"#b51b1b",timeout:3e3})).finally(()=>{l.style.display="none",a.reset()})}
//# sourceMappingURL=commonHelpers.js.map
