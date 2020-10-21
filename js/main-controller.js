'use strict';
var gYPos = 100;

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
    if (currLineIdx === lines.length - 1) {
        switchToLine(0);
        document.querySelector('.meme-title').value = getTxt();
        renderCanvas();
        drawRect();
        return;
    }
    switchToLine(++currLineIdx);
    document.querySelector('.meme-title').value = getTxt();
    renderCanvas();
    drawRect();
}





function onChooseItem() {
    console.log(gMeme.selectedLineIdx);
}

function onDeleteLine() {
    deleteLine();
    renderTxt();
    renderCanvas();
}

function onAddLine() {
    var lines = getLines();
    if (lines.length === 0) {
        addNewLine(250, 20);
    } else if (lines.length === 1) {
        addNewLine(250, 430);
        gYPos = 100;
    } else {
        addNewLine(250, gYPos);
        gYPos += 50;
    }
    onSwitchLine();
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
    renderCanvas();
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