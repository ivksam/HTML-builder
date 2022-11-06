const fs = require("fs");
const path = require('path');
const {rm, readdir} = require('fs/promises');

let source = path.join(__dirname + '\\styles');
let target = path.join(__dirname + '\\project-dist' + '\\bundle.css');

async function mergeStyles(style, bundle) {
    await rm(bundle, {force: true});

    let fileCSS = (await readdir(style)).filter(file => path.extname(path.join(style, file)) === '.css');

        fileCSS.forEach(file => {

            let readCSS = fs.createReadStream(path.join(style, file), 'utf-8');

            readCSS.pipe(fs.createWriteStream(bundle, {flags: 'a'}));
        });
    }
mergeStyles(source,target);

