'use strict';
var gYPos = 200;
var gIsLineDragable = false;
var gIsLineMoved = false;

function onInit() {
    var elCanvas = document.querySelector('#myCanvas');
    setCanvas(elCanvas);
    renderImageGallery();
    renderEmojis();
    loadSavedMemes();
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
        updateControlBox();
        renderCanvas();
        drawRect();
        return;
    }
    switchToLine(++currLineIdx);
    updateControlBox();
    renderCanvas();
    drawRect();
}


function onAddLine() {
    var lines = getLines();
    if (lines.length === 0) {
        addNewLine(getCanvasWidth() / 2, 20);
        switchToLine(lines.length - 1);
    } else if (lines.length === 1) {
        addNewLine(getCanvasWidth() / 2, getCanvasHeight() - 70);
        gYPos = getCanvasHeight() / 2;
        switchToLine(lines.length - 1);
    } else {
        addNewLine(getCanvasWidth() / 2, gYPos);
        switchToLine(lines.length - 1);
    }
    renderCanvas();
    drawRect();
    updateControlBox();
}


function onReleaseLine(ev) {
    gIsLineDragable = false;
    renderCanvas();
    renderLines();
    var lines = getLines();
    lines.forEach((line) => {
        if (ev.offsetX > line.xPos - (measureText(line.txt) / 2) && ev.offsetX < line.xPos + (measureText(line.txt) / 2) &&
            ev.offsetY > line.yPos && ev.offsetY < line.yPos + line.fontSize && !gIsLineMoved) {
            drawRect();
            updateControlBox();
        }
    })
}


function onDragLine(ev) {
    if (gIsLineDragable) {
        gIsLineMoved = true;
        moveLine(ev.offsetX, ev.offsetY);
        renderCanvas();
        drawRect();
    }
}


function onSelectLine(ev) {
    var lines = getLines();
    lines.forEach((line) => {
        if (ev.offsetX > line.xPos - (measureText(line.txt) / 2) && ev.offsetX < line.xPos + (measureText(line.txt) / 2) &&
            ev.offsetY > line.yPos && ev.offsetY < line.yPos + line.fontSize) {
            updateSelectedLineIdx(line.id);
            updateControlBox();
            gIsLineDragable = true;
            renderCanvas();
            drawRect();
        }
    })
    gIsLineMoved = false;
}

function isMouseOver(ev, line) {

}


function onDeleteLine() {
    deleteLine();
    renderCanvas();
    drawRect();
    var lines = getLines();
    if (!lines.length) {
        resetIdCounter();
        document.querySelector('.meme-title').value = '';
        return;
    }
    updateControlBox();
}


function onSetFontFamily(fontName) {
    setFontFamily(fontName);
    renderCanvas();
}


function onChooseFillColor(color) {
    changeFillColor(color);
    renderCanvas();
    drawRect();
}

function onChooseStrokeColor(color) {
    changeStrokeColor(color);
    renderCanvas();
    drawRect();
}

function onAlignRight() {
    alignTxtRight();
    renderCanvas();
    drawRect();
}

function onAlignCenter() {
    alignTxtCenter();
    renderCanvas();
    drawRect();
}

function onAlignLeft() {
    alignTxtLeft();
    renderCanvas();
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
    var txt = getTxt();
    drawText(txt);
    renderLines();
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
    initGmeme();
    document.querySelector('.meme-title').value = '';
    document.querySelector('.meme-editor').classList.add('show');
    document.querySelector('.image-gallery-h1').classList.add('hide');
    document.querySelector('.search-bar').value = '';
    renderCanvas();
    onFilterImgs('');
    scrollTo(0, 0);
}


function onRenderImg() {
    var imgId = getImgId();
    var elImg = document.querySelector(`.img-${imgId}`);
    elImg.onload = () => {
        renderImg(elImg);
        onRenderTxt();
    }
    resizeCanvas();
    renderImg(elImg);
    onRenderTxt();
}


function renderImageGallery(imgs = getImages()) {
    var elGallery = document.querySelector('.image-gallery');
    var strHtml = '';
    var images = imgs;
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
    document.querySelector('.main-nav').classList.toggle('show-menu');
}


function updateControlBox() {
    document.querySelector('.stroke-color').value = getStrokeColor();
    document.querySelector('.fill-color').value = getFillColor();
    document.querySelector('.fonts-menu').value = getFontName();
    document.querySelector('.meme-title').value = getTxt();
    document.querySelector('.meme-title').focus();

}


function renderEmojis() {
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
    renderEmojis();
}


function onPrevEmojis() {
    var emojis = getEmojiz();
    if (!emojis) return;
    setPrevPos();
    renderEmojis();
}


function onAddEmojiToCanvas(emoji) {
    onAddLine();
    onChangeTxt(emoji);
    updateControlBox();
    renderCanvas();
    drawRect();
}


function onSaveMeme() {
    renderCanvas();
    saveMeme();
    document.querySelector('.btn-3-save').classList.add('shaky');
    document.querySelector('.mems').classList.add('rotate');
    var rotate = setTimeout(() => {
        document.querySelector('.mems').classList.remove('rotate');

    }, 100);
    var shake = setTimeout(() => {

        document.querySelector('.btn-3-save').classList.remove('shaky');

    }, 800);

}



function loadSavedMemes() {
    var loadedGmeme = loadFromStorage(STORAGE_KEY_GMEME);
    if (!loadedGmeme) {
        return;
    } else {
        setLoadedMeme(loadedGmeme);
        renderLoadedMeme(loadedGmeme.selectedImgId);
        renderCanvas();
        removeGmemeStorage();
        // onRenderTxt();
    }
}


function renderLoadedMeme(imgId) {
    setImg(imgId);
    document.querySelector('.meme-editor').classList.add('show');
    document.querySelector('.image-gallery-h1').classList.add('hide');
    resizeCanvas();
    renderCanvas();
    scrollTo(0, 0);
}

function onFilterImgs(keyword) {
    var imgs = getImages();
    var relevantImgs = imgs.filter((img) => img.keywords.some((word) => word.includes(keyword)));
    renderImageGallery(relevantImgs);
}

function onSearchWord(word) {
    onFilterImgs(word.innerText);
    document.querySelector('.search-bar').value = word.innerText;
    document.querySelector('.search-bar').focus();
}