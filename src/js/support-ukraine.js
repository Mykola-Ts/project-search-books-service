const refs = {
    slider: document.querySelector('.slider'),
    sliderList: document.querySelector('.slider-list'),
    sliderItem: document.querySelectorAll('.slider-item'),
    btnNext: document.querySelector('.slider-btn-next'),
    btnPrev: document.querySelector('.slider-btn-prev'),
}

let sliderCount = 0;
let sliderHeigth = 52;

refs.btnNext.addEventListener('click', onClickNext);

function onClickNext() {
    sliderCount += 1;
    rollSlider()
    if (refs.slider.clientHeight === 188) {
        if (sliderCount >= refs.sliderItem.length - 4) {
            addDisplayNone(refs.btnNext);
            addDisplayBlock( refs.btnPrev);
    }  
    }
    else if (refs.slider.clientHeight === 292) {
        if (sliderCount >= refs.sliderItem.length - 6) {
            addDisplayNone(refs.btnNext);
            addDisplayBlock(refs.btnPrev);
    }  
    }
}

refs.btnPrev.addEventListener('click', onClickPrev);

function onClickPrev() {
    sliderCount -= 1;
    rollSlider();
     if (sliderCount === 0) {
         addDisplayBlock(refs.btnNext);
         addDisplayNone(refs.btnPrev);
    }
}

function rollSlider() {
    refs.sliderList.style.transform = `translateY(${-sliderCount * sliderHeigth}px)`;
}

function addDisplayBlock(el) {
    el.style.display = 'block';
}

function addDisplayNone(el) {
    el.style.display = 'none';
}