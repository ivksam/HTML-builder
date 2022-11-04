const fs = require('fs');
const path = require('path');
const folder = 'secret-folder';

fs.readdir(path.join(__dirname,folder),{ withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      fs.stat(path.join(__dirname,folder,file.name), (err, stats) =>{
        if (err)
          console.log(err);
        else {
          if (file.isFile()) {
            console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stats.size/1024}kb`);
          }
        }
      });
    });
  }
});

