function countVowels(str) {
  let count = 0;
  const string = str.toLowercase().split("");
  for (let i = 0; i < string.length; i++) {
    if (
      string[i] === "a" ||
      string[i] === "e" ||
      string[i] === "i" ||
      string[i] === "o" ||
      string[i] === "u"
    ) {
      count += 1;
    }
  }
  return count;
}

function countVowels2(str){
    return str.toLowerCase().split('').filter(char => 'aeiou'.includes(char)).length;
}

console.log(countVowels2('skanda'));

