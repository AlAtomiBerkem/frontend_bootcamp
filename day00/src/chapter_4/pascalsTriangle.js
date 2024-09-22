// Напишите функцию, которая будет принимать координаты числа в треугольника Паскаля и будет возвращать значение по координатам.
// Если вы не знаете, что такое треугольник Паскаля, советую прочитать перед выполнение задания.
// https://cdn.fishki.net/upload/post/201502/04/1414683/947eb978f710426fd0702fd119da506b.gif тут можно посмотреть наглядно принцип работы.
// Предположим, что начальные координаты 0,0.
// Тут, возможно, поможет рекурсия.

function paskalsTriangle(x, y) {
    function fac(n) {
        if (n < 2) {
            return 1;
        } else return n * fac(n - 1)
      }
      return console.log(fac(x) / (fac(y)*fac(x - y)))
}


paskalsTriangle(3,2) // 3
paskalsTriangle(5,4) // 5
paskalsTriangle(8,3) // 56
paskalsTriangle(1,1) // 1
