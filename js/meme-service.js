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
            width: 400,
            height: 50,
        },
        {
            id: 2,
            txt: '',
            fontFamily: 'Impact',
            fontSize: 48,
            align: 'center',
            xPos: 250,
            yPos: 430,
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
    gCtx.beginPath();
    gCtx.lineWidth = '2';
    gCtx.rect(0, gMeme.lines[gMeme.selectedLineIdx].yPos, 500, gMeme.lines[gMeme.selectedLineIdx].fontSize);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}


function renderTxt() {
    gMeme.lines.forEach((line) => {
        drawText(line.txt, line.fontSize, line.xPos, line.yPos, line.align);
    })
}


function drawText(text, fontSize, xPos, yPos, align) {
    var size = fontSize;
    var strokeColor = 'black';
    var fillColor = 'white';
    gCtx.lineWidth = '1';
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


function getLines() {
    return gMeme.lines;
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx;
}


// function setSelectedTxt(txtId) {
//     gMeme.selectedLineIdx = txtId;
// }


function moveTxtUp() {
    gMeme.lines[gMeme.selectedLineIdx].yPos -= 10;
}


function moveTxtDown() {
    gMeme.lines[gMeme.selectedLineIdx].yPos += 10;
}



function decrearseTxt() {
    gMeme.lines[gMeme.selectedLineIdx].fontSize -= 6;
}


function increaseTxt() {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += 6;
}

function getTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setTxt(txt) {
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
    var elContainer = document.querySelector('.meme-editor');
    if (elContainer.offsetWidth > 500) return;
    if (!elContainer.offsetWidth) {
        elCanvas.width = 500;
        elCanvas.height = 500;
    }
    elCanvas.width = elContainer.offsetWidth;
    elCanvas.height = elContainer.offsetWidth;
}