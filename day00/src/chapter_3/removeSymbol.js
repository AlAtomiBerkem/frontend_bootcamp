// Функция на вход принимает две строки - сообщение (обычная строка с текстом) и символ который надо удалить из этого сообщения.

function removeString(message, symbol) {
    let regex = new RegExp(symbol, 'g');
        newstring = message.replace(regex, '');
        return console.log(newstring);
}
removeString("Большое и интересное сообщение", "о");

 removeString("Hello world!", "z");

 removeString("А роза азора", "А");