// Напишите функцию банкомат которая принимает на вход число и возвращает объект в формате: {номинал_купюры : количество_купюр}.
// Если банкомат не может выдать данную сумму, то выводится ошибка 'Incorrect value'.
// Купюры должны выдаться оптимальным образом (вместо 5 купюр номиналом 1000 выдается одна 5000).
// За раз банкомат может выдавать не более 20 купюр, если купюр для выдачи не хватает то выводится ошибка 'Limit exceeded'

function atm(sum) {
  const banknotes = [5000, 2000, 1000, 500, 200, 100, 50];
  let obj = {};

  for (let i = 0; i <= banknotes.length - 1; i++) {
    let key = banknotes[i].toString();
    let value = 0;
    obj[key] = value;
}
result = JSON.stringify(obj);
const limit_sum = 100000;
  let bancnot_limit = 0;

  // 5000
  while (sum >= banknotes[0] && bancnot_limit < 20) {
    sum -= banknotes[0];
    ++obj['5000']
    ++bancnot_limit;
  }
  // 2000
  while (sum >= banknotes[1] && bancnot_limit < 20) {
    sum -= banknotes[1];
    ++obj['2000']
    ++bancnot_limit;
  }
  //1000
  while (sum >= banknotes[2] && bancnot_limit < 20) {
    sum -= banknotes[2];
    ++obj['1000'];
    ++bancnot_limit;
  }
  //500
  while (sum >= banknotes[3] && bancnot_limit < 20) {
    sum -= banknotes[3];
    ++obj['500']
    ++bancnot_limit;
  }
  // 200
  while (sum >= banknotes[4] && bancnot_limit < 20) {
    sum -= banknotes[4];
    ++obj['200']
    ++bancnot_limit;
  }
  // 100
  while (sum >= banknotes[5] && bancnot_limit < 20) {
    sum -= banknotes[5];
    ++obj['100']
    ++bancnot_limit;
  }
  // 50
  while (sum >= banknotes[6] && bancnot_limit < 20) {
    sum -= banknotes[6];
    ++obj['50']
    ++bancnot_limit;
  }

  // Проверка, если лимит достигнут и остались деньги
  if (sum <= 0) {
    console.log('please inter valid value')
  } else if (bancnot_limit >= 20 && bancnot_limit < sum) {
    console.log('limit exceeded');
  } else if (sum != 0) {
    console.log('Incorrect value')
  } else {let result = '{' + Object.keys(obj).map(key => `${key}:${obj[key]}`).join(', ') + '}';
  console.log(result);}
  //console.log(JSON.stringify(obj));
}

let sum = 0;
atm(sum);
