const fs = require('fs');
const path = require('path');
const {mkdir, readdir, unlink, readFile} = require('fs/promises');

let file = __dirname;
let source = path.join(file);
let target = path.join(__dirname + '\\project-dist');

// create html
async function createHTML(source, folder) {

    let templateFile = await readFile(source + '/template.html', 'utf8');

    for (let file of await readdir(source + folder)) {
        if (path.parse(source + folder + file).ext === '.html') {

            let readHTMLStream = await readFile(source + folder + file, 'utf8');
            let regExpHTML = new RegExp(`{{${path.parse(source + folder + file).name}}}`);

            templateFile = templateFile.replace(regExpHTML, readHTMLStream);
        }
    }

    writeHTML(templateFile);

    function writeHTML(templateFile) {
        fs.createWriteStream(target + '/index.html').write(templateFile, 'utf8');
        fs.createWriteStream(target + '/index.html').end();
    }
}

// create styles
async function createStyle (source, folder) {
    source += folder;
    let data = '';

    for (let file of await readdir(source)) {
        if (path.parse(source + file).ext === '.css') {
            data += await readFile(source + file, 'utf8');
        }
    }
    bundle(data);

    function bundle(data) {
        fs.createWriteStream(target + '/style.css').write(data, 'utf8');
        fs.createWriteStream(target + '/style.css').end();
    }
}

// create Assets
async function createFolder(target) {
    try {
        await mkdir(target, {recursive: true});
        createStyle(source, '/styles/');
        createHTML(source, '/components/');
    }

    catch (error) {
        if (error) {
            return console.log(error.message);
        }
    }
}

function copyFolder(source, target, folder) {

    source += folder;
    target += folder;

    createDir(source, target);

    async function createDir(source, target) {
        try {
            function deleteFiles(target) {
                    if (file.isDirectory()) {
                        deleteFiles(path.join(target, file.name));
                    } else {
                        unlink(path.join(target, file.name));
                    }
                }
        }
        catch (error) {
            if (error) {
                return console.log(error.message);
            }
        }
        copyDir(source, target);
    }

    function copyDir(source, target) {
        fs.mkdir(target, {recursive: true}, function (error) {
            if (error) {
                return console.log(error.message);
            }
        });

        fs.readdir(source, {withFileTypes: true}, (error, files) => {
            files.forEach(file => {

                let sourceName = path.join(source, file.name);
                let targetName = path.join(target, file.name);

                if (file.isDirectory()) {
                    copyDir(sourceName, targetName, function (error) {
                        if (error) {
                            return console.log(error.message);
                        }
                    });
                } else {
                    fs.copyFile(sourceName, targetName, function (error) {
                        if (error) {
                            return console.log(error.message);
                        }
                    });
                }
            });
        });
    }
}

createFolder(target);
copyFolder(source, target, '/assets/');