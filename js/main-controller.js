'use strict';

function onInit() {
    var elCanvas = document.querySelector('#myCanvas');
    setCanvas(elCanvas);
    renderImageGallery();
    // resizeCanvas();
}

function renderCanvas() {
    onRenderImg();
    onRenderTxt();
}

function onSwitchLine() {
    var lines = getLines();
    if (!lines) return;
    var currLineIdx = getCurrLineIdx();
    if (currLineIdx === lines.length - 1) {
        switchToLine(0);
        return;
    }
    switchToLine(currLineIdx + 1);
}



function onMoveTxtDown() {
    moveTxtDown();
    renderCanvas();
}


function onMoveTxtUp() {
    moveTxtUp();
    renderCanvas();
}


function onDecreaseTxt() {
    decrearseTxt();
    renderCanvas();
}

function onIncreaseTxt() {
    increaseTxt();
    renderCanvas();
}

function onRenderTxt() {
    renderTxt();
    var txt = getTxt();
    drawText(txt);
}

function onChangeTxt(txt, txtId) {
    setTxt(txt, txtId);
    renderCanvas();
}


function onChooseTxt(elTxt) {
    var txtId = Number(elTxt.dataset.id);
    setSelectedTxt(txtId);
}

function onChooseImg(imgId) {
    // resizeCanvas();
    setImg(imgId);
    document.querySelector('.meme-editor').classList.add('show');
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


function onDownloadCanvas(elLink) {
    var canvas = getCanvas();
    const data = canvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}