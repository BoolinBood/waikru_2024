export const badWords = [
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
  "ควย",
  "ไอ้หี้ย",
  "เหี้ย",
  "สัด",
  "สัส",
  "เย็ด",
  "ข่มขืน",
  "หี",
  "หน้าหมา",
  "ชาติหมา",
  "nigga",
  "nigger",
  "faggot",
  "n4gger",
  "siclmyduck",
];

export function addBadWord(text: string) {
  if (!badWords.includes(text.toLowerCase())) {
    badWords.push(text.toLowerCase());
    return true;
  }

  return false;
}

export function addMoreBadword(texts: string[]) {
  let totalAdded = 0;
  for (const text of texts) {
    if (addBadWord(text)) {
      totalAdded++;
    }
  }

  return totalAdded;
}

export function checkBadWords(text: string) {
  return badWords.some((word) => text.toLowerCase().includes(word));
}
