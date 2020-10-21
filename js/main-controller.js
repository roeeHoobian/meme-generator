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
    document.querySelector('.meme-title').focus();
    var currLineIdx = getCurrLineIdx();
    console.log('currLineIdx', currLineIdx);
    if (currLineIdx === lines.length - 1) {
        switchToLine(0);
        renderCanvas();
        drawRect();
        return;
    }
    switchToLine(++currLineIdx);
    renderCanvas();
    drawRect();
}

function onChooseItem() {
    console.log(gMeme.selectedLineIdx);
}


function onAlignLeft() {
    alignTxtLeft();
    renderTxt();
}


function onMoveTxtDown() {
    moveTxtDown();
    renderCanvas();
    drawRect();
}


function onMoveTxtUp() {
    moveTxtUp();
    renderCanvas();
    drawRect();
}


function onDecreaseTxt() {
    decrearseTxt();
    renderCanvas();
    drawRect();
}

function onIncreaseTxt() {
    increaseTxt();
    renderCanvas();
    drawRect();
}

function onRenderTxt() {
    renderTxt();
    var txt = getTxt();
    drawText(txt);
}

function onChangeTxt(txt) {
    setTxt(txt);
    renderCanvas();
    drawRect();
}


function onChooseTxt(elTxt) {
    // var txtId = Number(elTxt.dataset.id);
    // setSelectedTxt(txtId);
    renderCanvas();
    drawRect();
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