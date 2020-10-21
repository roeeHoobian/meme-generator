'use strict';

function onInit() {
    var elCanvas = document.querySelector('#myCanvas');
    setCanvas(elCanvas);
    renderImageGallery();
}

function renderCanvas() {
    onRenderImg();
    onRenderTxt();
}

function onRenderTxt() {
    var txt = getTxt();
    drawText(txt);
}

function onChangeTxt(txt, txtId) {
    setTxt(txt, txtId);
    renderCanvas();
}


function onChooseImg(imgId) {
    setImg(imgId);
    renderCanvas()
}

function onRenderImg() {
    var imgId = getImgId();
    var elImg = document.querySelector(`.img-${imgId}`);
    renderImg(elImg);
}

function renderImageGallery() {
    var elGallery = document.querySelector('.image-gallery');
    var strHtml = '';
    var images = getImages();
    images.forEach((img) => {
        strHtml += `<img src=${img.url} class="img-${img.id}" onclick="onChooseImg(${img.id})">`
    });
    elGallery.innerHTML = strHtml;
}