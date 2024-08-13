"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBadWords = checkBadWords;
const badWords = [
    "kuy",
    "ihere",
    "isus",
    "inahee",
    "huakuy",
    "hee",
    "pussy",
    "kys",
    "dogshit",
    "yourmum",
    "yourmom",
    "cunt",
    "dick",
    "huadoor",
    "cancercancer",
];
function checkBadWords(text) {
    return badWords.some((word) => text.includes(word));
}
