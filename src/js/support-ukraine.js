const selectors = {
  slider: document.querySelector('.slider'),
  sliderList: document.querySelector('.slider-list'),
  sliderItem: document.querySelectorAll('.slider-item'),
  btnNext: document.querySelector('.slider-btn-next'),
  btnPrev: document.querySelector('.slider-btn-prev'),
};
let sliderCount = 0;
let sliderHeigth = 52;

selectors.btnNext.addEventListener('click', onClickNext);

function onClickNext() {
  sliderCount += 1;

  rollSlider();

  if (selectors.slider.clientHeight === 188) {
    if (sliderCount >= selectors.sliderItem.length - 4) {
      addDisplayNone(selectors.btnNext);
      addDisplayBlock(selectors.btnPrev);
      selectors.btnNext.removeEventListener('click', onClickNext);
      selectors.btnPrev.addEventListener('click', onClickPrev);
    }
  } else if (selectors.slider.clientHeight === 292) {
    if (sliderCount >= selectors.sliderItem.length - 6) {
      addDisplayNone(selectors.btnNext);
      addDisplayBlock(selectors.btnPrev);
      selectors.btnNext.removeEventListener('click', onClickNext);
      selectors.btnPrev.addEventListener('click', onClickPrev);
    }
  }
}

function onClickPrev() {
  sliderCount -= 1;

  rollSlider();

  if (sliderCount === 0) {
    addDisplayBlock(selectors.btnNext);
    addDisplayNone(selectors.btnPrev);
    selectors.btnPrev.removeEventListener('click', onClickPrev);
    selectors.btnNext.addEventListener('click', onClickNext);
  }
}

function rollSlider() {
  selectors.sliderList.style.transform = `translateY(${
    -sliderCount * sliderHeigth
  }px)`;
  selectors.sliderList.style.transition =
    'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
}

function addDisplayBlock(el) {
  el.style.display = 'block';
}

function addDisplayNone(el) {
  el.style.display = 'none';
}
