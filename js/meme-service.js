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
    SelectedLineIdx: 0,
    lines: [{
            id: 1,
            txt: 'hello canvas',
            fontFamily: 'Impact',
            fontSize: 48,
            align: 'center',
            xPos: 50,
            yPos: 50,
            width: 400,
            height: 50,
        },
        {
            id: 2,
            txt: 'Holly Guacamolys',
            fontFamily: 'Impact',
            fontSize: 48,
            align: 'center',
            xPos: 50,
            yPos: 350,
            width: 400,
            height: 50,
        }

    ],

}

function clearTxt() {
    gCtx.clearRect(gMeme.lines[gMeme.SelectedLineIdx].xPos, gMeme.lines[gMeme.SelectedLineIdx].yPos, 400, 70);
}

function renderTxt() {
    gMeme.lines.forEach((line) => {
        drawText(line.txt, line.fontSize, line.xPos, line.yPos);
    })
}




function drawText(text, fontSize, xPos, yPos) {
    var size = fontSize;
    var strokeColor = 'black';
    var fillColor = 'white';
    gCtx.lineWidth = '1';
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = 'start';
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.fillText(text, xPos, yPos);
    gCtx.strokeText(text, xPos, yPos);

}


function switchToLine(nextLine) {
    gMeme.SelectedLineIdx = nextLine;
}


function getLines() {
    return gMeme.lines;
}

function getCurrLineIdx() {
    return gMeme.SelectedLineIdx;
}


function setSelectedTxt(txtId) {
    gMeme.SelectedLineIdx = txtId;
}


function moveTxtUp() {
    gMeme.lines[gMeme.SelectedLineIdx].yPos -= 10;
}


function moveTxtDown() {
    gMeme.lines[gMeme.SelectedLineIdx].yPos += 10;
}



function decrearseTxt() {
    gMeme.lines[gMeme.SelectedLineIdx].fontSize -= 6;
}


function increaseTxt() {
    gMeme.lines[gMeme.SelectedLineIdx].fontSize += 6;
}

function getTxt() {
    return gMeme.lines[gMeme.SelectedLineIdx].txt;
}

function setTxt(txt) {
    gMeme.lines[gMeme.SelectedLineIdx].txt = txt;
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
    gCtx.drawImage(elImg, 0, 0);
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function getImages() {
    return gImgs;
}

function resizeCanvas() {
    var elCanvas = document.querySelector('#myCanvas');
    var elContainer = document.querySelector('.canvas-container');

    console.log(elContainer);

    elCanvas.width = elContainer.offsetWidth;
    elCanvas.height = elContainer.offsetHeight;
}