export const makeFirstLetterSections = ({array, target}) => {
    if (array.length === 0) {
      return [];
    }
    return Object.values(
        array.sort().reduce((acc, word) => {
            const firstLetter = word[target][0].toLocaleUpperCase();
            const firstLetterCode = firstLetter.charCodeAt(firstLetter)
            if (!acc[firstLetterCode]) {
            acc[firstLetterCode] = {symbolCode: firstLetterCode, lettergroup: firstLetter, data: [word] };
            } else {
            acc[firstLetterCode].data.push(word);
            }
            return acc;
      }, {})
    );
}

export const splitFullName = (str) => {
  const count = 4;
  const cleantStr = removeSymbols(str)
  const splited = cleantStr.split(/\s/g)
  const concatArray = new Array(count - splited.length).fill('');
  const result = splited.concat(concatArray);
  console.log(result)
  return {
      surname: result[0],
      name: result[1],
      patronymic: result[2],
      otherwords: result[3]
  }
}

const removeSymbols = (str) => {
  if(isCyrillic(str)) {
    return str.replace(/[^a-zа-яё\s]/gi, '')
  }
  if(isLatin(text)) {
    return str.replace(/[^\w\s]|_/g, "")
  }
  return str
}

const isCyrillic = (text) => /[а-я]/i.test(text);
const isLatin = (text) => /[a-z]/i.test(text);


