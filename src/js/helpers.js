import amazonIconPng from '../../src/img/amazon-icon.png';
import amazonIconWebp from '../../src/img/amazon-icon.webp';
import appleBookIconPng from '../../src/img/apple-book-icon.png';
import appleBookIconWebp from '../../src/img/apple-book-icon.webp';
import bookShopIconPng from '../../src/img/book-shop-icon.png';
import bookShopIconWebp from '../../src/img/book-shop-icon.webp';

export const errorMessageText =
  'Oops, something went wrong. Try reloading the page.';
const arrIconsLink = [
  { name: 'Amazon', img: { png: amazonIconPng, webp: amazonIconWebp } },
  {
    name: 'Apple Books',
    img: { png: appleBookIconPng, webp: appleBookIconWebp },
  },
  {
    name: 'Barnes and Noble',
    img: { png: bookShopIconPng, webp: bookShopIconWebp },
  },
];

export function createMarkupBuyLinks(buyLinks = []) {
  return buyLinks
    .map(({ url, name }) => {
      const icon = arrIconsLink.find(iconLink => iconLink.name === name);

      return `<li class="buy-link-icon-item">
                  <a
                    href="${url}"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="buy-link"
                    aria-label="Open book on ${name}"
                  >
                    <picture>
                      <source srcset="${icon.img.webp}" type="image/webp" />
                      <source srcset="${icon.img.png}" type="image/png" />
                      <img
                        src="${icon.img.png}"
                        alt="${name}"
                        loading="lazy"
                        class="buy-link-icon ${
                          name === 'Amazon' ? 'buy-link-icon-amazon' : ''
                        }"
                    /></picture>
                  </a>
                </li>`;
    })
    .join('');
}
