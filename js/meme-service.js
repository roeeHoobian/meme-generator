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
            fontSize: '48',
            align: 'center',
            xPos: 50,
            yPos: 50,
            width: 400,
            height: 50,
        }

    ],

}

function getTxt() {
    return gMeme.lines[gMeme.SelectedLineIdx].txt;
}

function setTxt(txt) {
    gMeme.lines[gMeme.SelectedLineIdx].txt = txt;
}


function drawText(text) {
    var strokeColor = 'black';
    var fillColor = 'white';
    gCtx.lineWidth = '1';
    gCtx.font = '68px Impact';
    gCtx.textAlign = 'start';
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.fillText(text, 50, 70);
    gCtx.strokeText(text, 50, 70);

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