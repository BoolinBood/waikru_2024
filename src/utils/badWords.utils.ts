import Filter from "bad-words";

const filterBadWords = new Filter();
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
  "cancer",
];

filterBadWords.addWords(...badWords);

export function checkBadWords(text: string) {
  return filterBadWords.isProfane(text);
}
