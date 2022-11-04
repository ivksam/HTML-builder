const fs = require('fs');
const path = require('path');
const process = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"), 'utf-8');

process.stdout.write('Введіть текст:\n');
process.on('SIGINT', function () {
    process.exit();
});
process.stdin.on('data', function (print) {
    print.toString().toLowerCase().trim() === 'exit' ? process.exit() : writeStream.write(print);
});
process.on('exit', function () {
    process.stdout.write('До побачення!\n');
});
writeStream.on('error', function (error) {
    console.log(error.message);
    process.exit();
});
