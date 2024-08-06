import Filter from 'bad-words';

const filterBadWords = new Filter();
const badWords = ["",""];
filterBadWords.addWords(...badWords);

export function checkBadWords(text: string) {
  return filterBadWords.isProfane(text);
}
