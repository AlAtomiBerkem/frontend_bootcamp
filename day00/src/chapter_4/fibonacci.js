// Напишите функицю, которая принимает индекс числа из ряда Фибоначчи и возвращает его значение.
// Предположим, что ряд Фибоначчи начинается с 0 индекса.


function fibo(index) {
    if (index === 0 || index === 1) {
        return index;                                   // ряд Фибоначчи начинается с 0 индекса
    } else return (fibo(index - 1) + fibo(index - 2));
}

function fib(n) {
let f1 = 0, f2 = 1, cf = 1;
for(let i = 1; i <= n; i ++) {
cf = f1 + f2;                      // ряд Фибоначчи представлен как  1,1,2,3,5,8,13 .....
f1 = f2;
f2 = cf;
    }
    return cf;
}

console.log(fibo(5)) // Вернет 5
console.log(fib(5)); // вернет 8
