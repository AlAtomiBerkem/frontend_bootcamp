//  В этой задаче нужно будет написать алгоритм поиска, который скажет, можно ли найти входное слово в головоломке поиска слов, которая тоже подается функции на вход.
// Данная задача имеет два уровня сложности :
// - Первый уровень включает в себя исключительно поиск по вертикали и по горизонтали
// - Второй уровень дополнительно включает в себя поиск по диагонали
// - Слова могут быть записаны слева направо и наоборот.
const examplePuzzle = [
  ["b", "l", "g", "o", "l", "d", "s"],
  ["x", "k", "q", "w", "i", "j", "p"],
  ["a", "n", "w", "k", "k", "p", "n"],
  ["h", "e", "e", "e", "k", "i", "l"],
  ["q", "e", "k", "a", "y", "q", "a"],
  ["h", "u", "h", "a", "e", "a", "u"],
  ["k", "q", "j", "c", "c", "m", "r"],
];

function searchSubString(puzzle, word) {
  let cols = [];
  for (let c = 0; c < puzzle[0].length; c++) {
      let col = '';
      for (let r = 0; r < puzzle.length; r++) {
          col += puzzle[r][c];
      }
      cols.push(col);
  }
let newcols = cols.join(' ').replace(/[\s,]/g, '')
let parspazl = puzzle.join(' ').replace(/[\s,]/g, '');

let reversword = word.split('').reverse().join('');
let includesBoth = ((parspazl + newcols).includes(reversword) || (parspazl + newcols).includes(word))

return console.log(includesBoth);
}


console.log('Level 1');
searchSubString(examplePuzzle, "like"); // true
searchSubString(examplePuzzle, "gold"); // true
searchSubString(examplePuzzle, "queen"); // true

console.log('Level 2');
searchSubString(examplePuzzle, "cake"); // true