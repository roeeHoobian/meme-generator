'use strict';

var gCanvas;
var gCtx;
var gNextId = 0;

var gImgs = [
    { id: 1, url: "img/1.jpg", keywords: [] },
    { id: 2, url: "img/2.jpg", keywords: [] },
    { id: 3, url: "img/3.jpg", keywords: [] },
    { id: 4, url: "img/4.jpg", keywords: [] },
    { id: 5, url: "img/5.jpg", keywords: [] },
    { id: 6, url: "img/6.jpg", keywords: [] },
    { id: 7, url: "img/7.jpg", keywords: [] },
    { id: 8, url: "img/8.jpg", keywords: [] },
    { id: 9, url: "img/9.jpg", keywords: [] },
    { id: 10, url: "img/10.jpg", keywords: [] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        id: getNewId(),
        txt: '',
        fontFamily: 'Impact',
        fontSize: 48,
        align: 'center',
        xPos: 250,
        yPos: 20,
        strokeColor: '#000000',
        fillColor: '#ffffff',
        width: 400,
        height: 50,
    }],
}


function measureText(txt) {
    return gCtx.measureText(txt).width;
}



function getNewId() {
    return gNextId++;
}

function resetIdCounter() {
    gNextId = 0;
}


function updateSelectedLineIdx(lineId) {
    gMeme.selectedLineIdx = lineId;
}

function getXPos() {
    console.log(gCanvas.width / 2);
    return gCanvas.width / 2
}

function drawRect() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gCtx.beginPath();
    gCtx.lineWidth = '2';
    gCtx.rect(gMeme.lines[gMeme.selectedLineIdx].xPos - measureText(gMeme.lines[gMeme.selectedLineIdx].txt) / 2, gMeme.lines[gMeme.selectedLineIdx].yPos, measureText(gMeme.lines[gMeme.selectedLineIdx].txt), gMeme.lines[gMeme.selectedLineIdx].fontSize);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}


function renderTxt() {
    gMeme.lines.forEach((line) => {
        drawText(line.txt, line.fontSize, line.xPos, line.yPos, line.align, line.strokeColor, line.fillColor, line.fontFamily);
    })
}


function drawText(text, fontSize, xPos, yPos, align, strokeColor, fillColor, fontFamily) {
    var size = fontSize;
    gCtx.lineWidth = '2';
    gCtx.textBaseline = "top";
    gCtx.font = `${size}px ${fontFamily}`;
    gCtx.textAlign = align;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.fillText(text, xPos, yPos);
    gCtx.strokeText(text, xPos, yPos);

}


function switchToLine(nextIdx) {
    gMeme.selectedLineIdx = nextIdx
}


function addNewLine(x, y) {
    var line = {
        id: getNewId(),
        txt: '',
        fontFamily: 'Impact',
        fontSize: 48,
        align: 'center',
        xPos: x,
        yPos: y,
        strokeColor: '#000000',
        fillColor: '#ffffff',
        width: gCanvas.width,
        height: 50,
    }
    gMeme.lines.push(line);
}

function moveLine(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].xPos = x;
    gMeme.lines[gMeme.selectedLineIdx].yPos = y - (gMeme.lines[gMeme.selectedLineIdx].fontSize / 2);
}

function getCanvasHeight() {
    return gCanvas.height;
}

function getLines() {
    return gMeme.lines;
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx;
}


function deleteLine() {
    var prevSelectedLine = gMeme.selectedLineIdx;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (prevSelectedLine === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    } else if (prevSelectedLine === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else {
        gMeme.selectedLineIdx = prevSelectedLine - 1;
    }
}

function getFontName() {
    if (!gMeme.lines[gMeme.selectedLineIdx].fontFamily) return;
    return gMeme.lines[gMeme.selectedLineIdx].fontFamily;
}


function setFontFamily(fontName) {
    if (!fontName) return;
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontName;
}


function getFillColor() {
    if (!gMeme.lines.length) return;
    if (!gMeme.lines[gMeme.selectedLineIdx].fillColor) return;
    return gMeme.lines[gMeme.selectedLineIdx].fillColor;
}


function getStrokeColor() {
    if (!gMeme.lines.length) return;
    if (!gMeme.lines[gMeme.selectedLineIdx].strokeColor) return;
    return gMeme.lines[gMeme.selectedLineIdx].strokeColor;
}

function changeFillColor(color) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

function changeStrokeColor(color) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}


function alignTxtRight() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].xPos = gCanvas.width - 20;
    gMeme.lines[gMeme.selectedLineIdx].align = 'end';
}

function alignTxtCenter() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].xPos = gCanvas.width / 2;
    gMeme.lines[gMeme.selectedLineIdx].align = 'center';
}

function alignTxtLeft() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].xPos = 20;
    gMeme.lines[gMeme.selectedLineIdx].align = 'start';
}

function moveTxtUp() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].yPos -= 10;
}


function moveTxtDown() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].yPos += 10;
}



function decrearseTxt() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].fontSize -= 6;
}


function increaseTxt() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].fontSize += 6;
}

function getTxt() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt;
    return txt;
}

function setTxt(txt) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}


function getImgId() {
    return gMeme.selectedImgId;
}

function setCanvas(elCanvas) {
    gCanvas = elCanvas;
    gCtx = gCanvas.getContext('2d');
}



function renderImg(elImg) {
    if (!elImg) return;
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function getImages() {
    return gImgs;
}

function getCanvas() {
    return gCanvas;
}

function resizeCanvas() {
    var elCanvas = document.querySelector('#myCanvas');
    var elContainer = document.querySelector('.canvas-container');

    if (elContainer.offsetWidth >= 520 || !elContainer.offsetWidth) return;
    elCanvas.width = elContainer.offsetWidth;
    elCanvas.height = elContainer.offsetWidth;
    _initTxtSettings();
}

function _initTxtSettings() {
    gMeme.lines[gMeme.selectedLineIdx].xPos = gCanvas.width / 2;
}