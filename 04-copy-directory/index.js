const fs = require('fs');
const path = require('path');
const sourceFolder = 'files';
const targetFolder = 'files-copy';

fs.mkdir(path.join(__dirname, targetFolder), {
    recursive: true}, error => {
    if (error) {
        console.log(error.message)
    };
})

fs.readdir(path.join(__dirname, targetFolder), {
    withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error.message)
    };

    files.forEach(file => {
        fs.unlink(path.join(__dirname, targetFolder, file.name), (error) => {
            if (error) {
                console.log(error.message)
            };
        });
    });
});

fs.readdir(path.join(__dirname, sourceFolder), { withFileTypes: true }, (error, files) => {
    if (error) {
        console.log(error.message)
    };
    files.forEach(file => {
        fs.copyFile(path.join(__dirname, sourceFolder, file.name), path.join(__dirname, targetFolder, file.name), (error) => {
            if (error) {
                console.log(error.message)
            };
        });
    });
});