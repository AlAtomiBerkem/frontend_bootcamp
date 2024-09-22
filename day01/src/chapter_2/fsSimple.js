const fs = require("fs");

const file_1 = './files/fsSimple/file1.txt';
const file_2 = './files/fsSimple/file2.txt';

const readAndWriteCallbackHell = (file1, file) => {
    fs.readFile(file1, 'utf8', (err, read1text) => {
        if (err) throw err;
            console.log(`\nсодержимое первого файла ${read1text}\n`);
            fs.writeFile(file, read1text, (err, text2) => {
        if (err) throw err;
            console.log('идет запись в file2\n')
            fs.readFile(file, 'utf-8', (err, read2text) => {
            if(err) throw err;
            console.log(`содержимое file2 ${read2text}\n`);
            })
        })
    })
}

 const readAndWritePromises = (file1, file2) => {
   const readPromisText = new Promise((resolve, reject) => {
        fs.readFile(file1, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
      })
    readPromisText.then(
         (data) => {
            return new Promise ((resolve, reject) => {
                fs.writeFile(file_2, data, 'utf-8', (err) => {
                    if (err)  reject(err);
                    else resolve('file2 записан!');
                })
            })
         })
         .then((resolve) => {
            console.log(resolve);
         })
         .catch((err) => {
            console.log('Error', err);
         })
   }


const readAndWriteAsyncAwait = async (file_1, file_2) => {
 try {
   const readtext = await fs.promises.readFile(file_1, 'utf8')
   await fs.promises.writeFile(file_2, readtext, 'utf-8',);
   console.log(`файл записан!`);

} catch (err) {
        console.log('Error', err);
    }
};

// тестим функции

 readAndWritePromises(file_1, file_2);
 readAndWriteCallbackHell(file_1, file_2);
 readAndWriteAsyncAwait(file_1, file_2);
 