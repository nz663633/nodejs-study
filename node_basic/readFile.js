const fs = require('fs').promises;

fs.readFile('./readme.txt')
    .then(() => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });