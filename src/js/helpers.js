import placeholderIconPng from '../../src/img/placeholder-book-shop-icon.png';
import placeholderIconWebp from '../../src/img/placeholder-book-shop-icon.webp';
import amazonIconPng from '../../src/img/amazon-icon.png';
import amazonIconWebp from '../../src/img/amazon-icon.webp';
import appleBookIconPng from '../../src/img/apple-book-icon.png';
import appleBookIconWebp from '../../src/img/apple-book-icon.webp';
import bookShopIconPng from '../../src/img/book-shop-icon.png';
import bookShopIconWebp from '../../src/img/book-shop-icon.webp';
import booksAMillionIconPng from '../../src/img/bam-icon.png';
import booksAMillionIconWebp from '../../src/img/bam-icon.webp';

export const errorMessageText =
  'Oops, something went wrong. Try reloading the page.';
const arrIconsLink = [
  {
    name: 'placeholder',
    img: { png: placeholderIconPng, webp: placeholderIconWebp },
  },
  { name: 'Amazon', img: { png: amazonIconPng, webp: amazonIconWebp } },
  {
    name: 'Apple Books',
    img: { png: appleBookIconPng, webp: appleBookIconWebp },
  },
  {
    name: 'Barnes and Noble',
    img: { png: bookShopIconPng, webp: bookShopIconWebp },
  },
  {
    name: 'Barnes & Noble',
    img: { png: bookShopIconPng, webp: bookShopIconWebp },
  },
  {
    name: 'Books-A-Million',
    img: { png: booksAMillionIconPng, webp: booksAMillionIconWebp },
  },
];

export function createMarkupBuyLinks(buyLinks = []) {
  return buyLinks
    .map(({ url, name }) => {
      const icon =
        arrIconsLink.find(iconLink => iconLink.name === name) ||
        arrIconsLink[0];

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
                          name === 'Amazon' || name === 'Books-A-Million'
                            ? 'buy-link-icon-dark'
                            : ''
                        }"
                    /></picture>
                  </a>
                </li>`;
    })
    .join('');
}
