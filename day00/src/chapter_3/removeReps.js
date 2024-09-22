// Вам нужно написать функцию которая принимает в качестве аргумента массив чисел и удаляет все повторяющиеся значения.

function removeReps(array) {
    let newarray = [];
    for(let i = 0; i < array.length; i ++) {
       if(!newarray.includes(array[i])) {
            newarray.push(array[i]);
        }
    }
    return console.log(newarray);
}

function removeReps(array) {
    let newarray = [];
for(const element of array) {
    if(!newarray.includes(element)) {
       newarray.push(element);
        }
    }
 return console.log(newarray);
}

removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11]); // [1,2,4,5,6,8,9,11]

