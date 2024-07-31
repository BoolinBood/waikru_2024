import Filter from 'bad-words';

export const checkDirtyWords = (text: string): boolean => {
    const checkWords = new Filter();
    const newBadWords = ["ควย","หี","แตด","ส้นตีน","ไอ่ส้นตีน","หัวควย","หน้าหี","ไอ่เหี้ย","ไอ่สัส","หนังหี","สวะ","ขยะ","ตูด","ตูดใหญ่","โง่","เย็ด","น่าเย็ด","หน้าเย็ด","เลียหี","เงี่ยน","หน้าเหี้ย","ไอ่อ้วน","ไออ้วน","ชิปหาย","ไอเหี้ย","ไอสัส","ไอ่ควย","ไอควย","ไอ่หน้าหี","ไอหน้าหี","hee","HEE","nahee","Nahee","kuy","Kuy","ชาติหมา","ชาติเปรต","ชาติชั่ว","เลวทราม","แม่เย็ด","แม่ง"]
    checkWords.addWords(...newBadWords);
    return checkWords.isProfane(text);

}

checkDirtyWords("Hello, this is a test message");