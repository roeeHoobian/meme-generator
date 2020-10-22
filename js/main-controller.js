'use strict';
var gYPos = 200;
var gIsLineDragable = false;
var gIsLineMoved = false;

function onInit() {
    var elCanvas = document.querySelector('#myCanvas');
    setCanvas(elCanvas);
    renderImageGallery();
}


function renderCanvas() {
    onRenderImg();
    onRenderTxt();
}


function onSwitchLine() {
    var lines = getLines();
    if (!lines.length) return;
    document.querySelector('.meme-title').focus();
    var currLineIdx = getCurrLineIdx();
    if (currLineIdx === lines.length - 1) {
        switchToLine(0);
        _updateControlBox()
        renderCanvas();
        drawRect();
        return;
    }
    switchToLine(++currLineIdx);
    _updateControlBox();
    renderCanvas();
    drawRect();
}


function onReleaseLine() {
    gIsLineDragable = false;
    renderCanvas();
    renderTxt();
    if (!gIsLineMoved) drawRect();
}


function onDragLine(ev) {
    if (gIsLineDragable) {
        gIsLineMoved = true;
        moveLine(ev.offsetX, ev.offsetY);
        renderCanvas();
        renderTxt();
        drawRect();
    }
}


function onSelectLine(ev) {
    var lines = getLines();
    lines.forEach((line) => {
        if (ev.offsetX > line.xPos - (measureText(line.txt) / 2) && ev.offsetX < line.xPos + line.width &&
            ev.offsetY > line.yPos && ev.offsetY < line.yPos + line.height) {
            updateSelectedLineIdx(line.id);
            _updateControlBox();
            gIsLineDragable = true;
            renderCanvas();
            renderTxt();
            drawRect();
        }
    })
    gIsLineMoved = false;

}


function onDeleteLine() {
    deleteLine();
    renderCanvas();
    renderTxt();
    drawRect();
    var lines = getLines();
    if (!lines.length) {
        resetIdCounter();
        document.querySelector('.meme-title').value = '';
        return;
    }
    _updateControlBox();
}


function onAddLine() {
    var lines = getLines();
    if (lines.length === 0) {
        addNewLine(250, 20);
    } else if (lines.length === 1) {
        var canvasHeight = getCanvasHeight();
        addNewLine(250, canvasHeight - 70);
        gYPos = canvasHeight / 2;
    } else {
        addNewLine(250, gYPos);
        gYPos += 50;
    }
    onSwitchLine();
    onAlignCenter();
}


function onSetFontFamily(fontName) {
    setFontFamily(fontName);
    renderCanvas();
    renderTxt();
}

function onChooseFillColor(color) {
    changeFillColor(color);
    renderCanvas();
    renderTxt();
    drawRect();
}

function onChooseStrokeColor(color) {
    changeStrokeColor(color);
    renderCanvas();
    renderTxt();
    drawRect();
}


function onAlignRight() {
    alignTxtRight();
    renderCanvas();
    renderTxt();
    drawRect();
}

function onAlignCenter() {
    alignTxtCenter();
    renderCanvas();
    renderTxt();
    drawRect();
}

function onAlignLeft() {
    alignTxtLeft();
    renderCanvas();
    renderTxt();
    drawRect();
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
    drawRect(txt);
}

function onChooseTxt() {
    if (getLines().length === 0) {
        onAddLine();
    }
    renderCanvas();
    drawRect();
}


function onHideEditor() {
    document.querySelector('.meme-editor').classList.remove('show');
}

function onChooseImg(imgId) {
    setImg(imgId);
    document.querySelector('.meme-editor').classList.add('show');
    resizeCanvas();
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


function onResizeCanvas() {
    resizeCanvas();
    renderCanvas();
}


function onShowMenu() {
    document.querySelector('.main-nav').classList.toggle('show');

}


function _updateControlBox() {
    document.querySelector('.meme-title').value = getTxt();
    document.querySelector('.stroke-color').value = getStrokeColor();
    document.querySelector('.fill-color').value = getFillColor();
    document.querySelector('.fonts-menu').value = getFontName();
}