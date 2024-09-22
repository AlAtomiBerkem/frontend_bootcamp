let bufer_data = [];

document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.calc-numbers');
    const buttons = ['btn0', 'btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8', 'btn9'];
    const simbols = ['btn_minus', 'btn_plas', 'btn_uno', 'btn_delen'];
    const operators = ['btn_result', 'btn_C', 'btn_larr'];
    
    buttons.forEach(function(id) {
         const button = document.getElementById(id);
        if (button) {
             button.addEventListener('click', function() {
                    bufer_data.push(button.textContent);
                    display.value = bufer_data.join('');
                    console.log(bufer_data);
         });
        }
    });

    simbols.forEach(function(id) {
        const simbol = document.getElementById(id);
        if (simbol) {
            simbol.addEventListener('click', function() {
                bufer_data.push(simbol.textContent);
                display.value = bufer_data.join('');
                console.log(bufer_data);
            }) 
        }
    })

    operators.forEach(function(id) {
        const operator = document.getElementById(id);

        operator.addEventListener('click', function() {

        if(id === 'btn_larr') {
            bufer_data.pop();
            display.value = bufer_data.join('');
            console.log(bufer_data);
        } else if (id === 'btn_C') {
            bufer_data.length = 0;
            display.value = '0';
            console.log(bufer_data);
        } else if (id === 'btn_result') {
            try {
                const result = eval(bufer_data.join(''));
                display.value = result;
                bufer_data = [result.toString()];
                console.log(result);
            } catch (error) {
                console.error('Ошибка при вычислении:', error);
                bufer_data.length = 0;
                display.value = 'Error';
            }
        }
        })
    })
});
