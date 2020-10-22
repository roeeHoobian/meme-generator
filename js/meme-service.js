'use strict';

var gCanvas;
var gCtx;
var gImgs = [
    { id: 1, url: "img/1.jpg", keywords: [] },
    { id: 2, url: "img/2.jpg", keywords: [] },
    { id: 3, url: "img/3.jpg", keywords: [] },
    { id: 4, url: "img/4.jpg", keywords: [] }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
            id: 1,
            txt: '',
            fontFamily: 'Impact',
            fontSize: 48,
            align: 'center',
            xPos: 250,
            yPos: 20,
            strokeColor: 'black',
            fillColor: 'white',
            width: 400,
            height: 50,
        }


    ],

}

function getXPos() {
    console.log(gCanvas.width / 2);

    return gCanvas.width / 2
}

function drawRect() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gCtx.beginPath();
    gCtx.lineWidth = '2';
    gCtx.rect(2, gMeme.lines[gMeme.selectedLineIdx].yPos, gCanvas.width - 5, gMeme.lines[gMeme.selectedLineIdx].fontSize);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}


function renderTxt() {
    gMeme.lines.forEach((line) => {
        drawText(line.txt, line.fontSize, line.xPos, line.yPos, line.align, line.strokeColor, line.fillColor);
    })
}


function drawText(text, fontSize, xPos, yPos, align, strokeColor, fillColor) {
    var size = fontSize;
    gCtx.lineWidth = '2';
    gCtx.textBaseline = "top";
    gCtx.font = `${size}px Impact`;
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
        id: 2,
        txt: '',
        fontFamily: 'Impact',
        fontSize: 48,
        align: 'center',
        xPos: x,
        yPos: y,
        strokeColor: 'black',
        fillColor: 'white',
        width: 400,
        height: 50,
    }
    gMeme.lines.push(line);
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