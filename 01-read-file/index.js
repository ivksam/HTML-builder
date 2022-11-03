const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let file = '';
readStream.on('data', data => file += data);
readStream.on('error', error => console.log(error.message));
readStream.on('end', () => console.log(file));