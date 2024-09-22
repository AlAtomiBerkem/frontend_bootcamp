const counter = (function() {
    let count = -3;

    return function() {
        count += 3;
        return count;
    };
})();

console.log(counter()); // 0
console.log(counter()); // 3
console.log(counter()); // 6
console.log(counter()); // 9


function counters() {
    let count = -3;
    return function (){
        return console.log(count += 3);
    };
}

let nz = counters();
nz()
nz()
nz()
nz()
