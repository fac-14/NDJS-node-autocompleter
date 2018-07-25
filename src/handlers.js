const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const mime = require('mime-types');

const indexHandler = (request, response) => {
    response.writeHead(200, mime.lookup('html'));
    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, file) =>{
        if(err){
            console.log(`omg there's an ${err}`);
            return;
        } else {
            // err is null...
            response.end(file);
        }
    })
}



module.exports = { indexHandler };