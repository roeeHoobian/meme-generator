'use strickt';

var emojis = ['👩‍🚀', '🐗', '🐾', '🦉', '🦩', '🦜', '🐟', '🐌', '🌺', '🍒', '🤹', '💘', '💋', '💥', '💣', '🗨', '💤', '🤘', '👁', '👅', '😀', '😁', '😈', '🤠', '🤯', '🚴', '🛀', '🤶', '🧙', '🧚'];

var gEmojiDisplayPos = {
    start: 0,
    end: 10
}

function getEmojiz() {
    return emojis;
}


function getStartPos() {
    return gEmojiDisplayPos.start;
}

function getEndPos() {
    return gEmojiDisplayPos.end;
}

function setNextPos() {
    if (gEmojiDisplayPos.start >= 20) return
    gEmojiDisplayPos.start += 10;
    gEmojiDisplayPos.end += 10;
}

function setPrevPos() {
    if (gEmojiDisplayPos.start === 0) return
    gEmojiDisplayPos.start -= 10;
    gEmojiDisplayPos.end -= 10;
}