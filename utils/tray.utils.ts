import Filter from 'bad-words';

export const checkDirtyWords = (text: string): boolean => {
    const checkWords = new Filter();
    const newBadWords = [""]
    checkWords.addWords(...newBadWords);
    return checkWords.isProfane(text);

}

checkDirtyWords("Hello, this is a test message");