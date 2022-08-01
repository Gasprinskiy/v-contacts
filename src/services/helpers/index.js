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
  const count = 3;
  const splited = str.split(/\s/g)
  const concatArray = new Array(count - splited.length).fill('');
  const result = splited.concat(concatArray);
  return {
      surname: result[0],
      name: result[1],
      patronymic: result[2]
  }
}

