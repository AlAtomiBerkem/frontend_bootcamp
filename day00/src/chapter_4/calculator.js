// Вам надо набор функций который будет симулировать работу калькулятора.
// Для этого вам надо написать 9 функций, которые могут принимать в качестве аргумента другую функцию, если функция передана, то надо вернуть вызов функции с числом n, иначе вернуть число n.
// Например, функция one может принять в качестве аргумента функцию sum, тогда в return будет sum(1).Если же в функцию не передали ничего, то она просто вернет 1.
// Также надо написать 4 функции основных арифмитических операторов, которые принимают в качестве аргумента первое число, а возвращают функцию, которая принимает в качестве аргумента второе число и возвращает их сумму/разность/частое/произведение.

function one(callback) {
    const num = 1;
    if (callback != null) {
   return callback(num)
} else return num;
}

function two(callback){
    const num = 2;
    if (callback != null) {
   return callback(num)
} else return num;
}

function three(callback) {
    const num = 3;
    if (callback != null) {
   return callback(num)
} else return num;
}
function four(callback) {
    const num = 4;
    if (callback != null) {
   return callback(num)
} else return num;
}
function five(callback) {
    const num = 5;
    if (callback != null) {
   return callback(num)
} else return num;
}
function six(callback) {
    const num = 6;
    if (callback != null) {
   return callback(num)
} else return num;
}
function seven(callback) {
    const num = 7;
    if (callback != null) {
   return callback(num)
} else return num;
}
function eight(callback) {
    const num = 8;
    if (callback != null) {
   return callback(num)
} else return num;
}
function nine(callback) {
    const num = 9;
    if (callback != null) {
   return callback(num)
} else return num;
}

function plus(a) {
    return function(b) {
        return a + b;
    }
}

function minus(a) {
    return function(b) {
        return a - b;
    }
}

function divide(a) {
    return function(b) {
        return a / b;
    }
}

function mult(a) {
    return function(b) {
        return a * b;
    }
}

console.log(one(mult(three(plus(four()))))); // В итоге вернется 7
console.log(five(mult(three()))); // 15
console.log(four()); // 4

// попробовать решить через массив с вызовом push