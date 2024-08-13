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

export function checkBadWords(text: string) {
  return badWords.some((word) => text.includes(word));
}
