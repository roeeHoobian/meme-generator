'use strict';
var gYPos = 200;
var gIsLineDragable = false;
var gIsLineMoved = false;

function onInit() {
    var elCanvas = document.querySelector('#myCanvas');
    setCanvas(elCanvas);
    renderImageGallery();
    onRenderEmojis();
    _onLoadSavedMemes();
    var loadedMeme = loadFromStorage(STORAGE_KEY_GMEME);
    if (!loadedMeme) {
        return;
    } else {
        setLoadedMeme(loadedMeme);
        onRenderLoadedMeme(loadedMeme.selectedImgId);
        setTimeout(() => {
            renderCanvas();
            renderTxt();
        }, 100);
        localStorage.removeItem(STORAGE_KEY_GMEME);
    }
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

function onAddLine() {
    var lines = getLines();
    if (lines.length === 0) {
        addNewLine(getCanvasWidth() / 2, 20);
    } else if (lines.length === 1) {
        addNewLine(getCanvasWidth() / 2, getCanvasHeight() - 70);
        gYPos = getCanvasHeight() / 2;
    } else {
        addNewLine(getCanvasWidth() / 2, gYPos);
    }
    onSwitchLine();
}

function onReleaseLine(ev) {
    gIsLineDragable = false;
    renderCanvas();
    renderTxt();
    var lines = getLines();
    lines.forEach((line) => {
        if (ev.offsetX > line.xPos - (measureText(line.txt) / 2) && ev.offsetX < line.xPos + (measureText(line.txt) / 2) &&
            ev.offsetY > line.yPos && ev.offsetY < line.yPos + line.fontSize && !gIsLineMoved) {
            drawRect();
        }
    })
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
        if (ev.offsetX > line.xPos - (measureText(line.txt) / 2) && ev.offsetX < line.xPos + (measureText(line.txt) / 2) &&
            ev.offsetY > line.yPos && ev.offsetY < line.yPos + line.fontSize) {
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

function onRenderTxt(Txt = getTxt()) {
    renderTxt();
    var txt = Txt;
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
    initGmeme();
    setImg(imgId);
    document.querySelector('.meme-editor').classList.add('show');
    resizeCanvas();
    renderCanvas();
    scrollTo(0, 0);
}

function onRenderImg(imgID = getImgId()) {
    var imgId = imgID;
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
    renderCanvas();
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

////////// emojis //////////
function onRenderEmojis() {
    var strHtml = '';
    var emojis = getEmojiz();
    var startPos = getStartPos();
    var endPos = getEndPos();
    for (var i = startPos; i < endPos; i++) {
        strHtml += `
        <div onclick="onAddEmojiToCanvas(this.innerText)">${emojis[i]}</div>
        `
    }
    document.querySelector('.emoji-display').innerHTML = strHtml;
}

function onNextEmojis() {
    var emojis = getEmojiz();
    if (!emojis) return;
    setNextPos();
    onRenderEmojis();
}

function onPrevEmojis() {
    var emojis = getEmojiz();
    if (!emojis) return;
    setPrevPos();
    onRenderEmojis();
}

function onAddEmojiToCanvas(emoji) {
    onAddLine();
    onChangeTxt(emoji);
    renderCanvas();
    drawRect();
}

////////////save memes ////////////
function onSaveMeme() {
    renderCanvas();
    saveMeme();
}

function _onLoadSavedMemes() {
    var savedMemes = loadFromStorage(STORAGE_KEY_MEMES);
    if (!savedMemes) return [];
    return savedMemes;
}

function onRenderLoadedMeme(imgId) {
    setImg(imgId);
    document.querySelector('.meme-editor').classList.add('show');
    document.querySelector('.main-section').classList.add('show');
    resizeCanvas();
    renderCanvas();
    scrollTo(0, 0);
}