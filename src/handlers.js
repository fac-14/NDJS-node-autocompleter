const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const mime = require("mime-types");

const indexHandler = (request, response) => {
  response.writeHead(200, mime.lookup("html"));
  fs.readFile(
    path.join(__dirname, "..", "public", "index.html"),
    (err, file) => {
      if (err) {
        console.log(`omg there's an ${err}`);
        return;
      } else {
        // err is null...
        response.end(file);
      }
    }
  );
};

const publicHandler = (request, response) => {
  response.writeHead(200, mime.lookup(request.url));
  fs.readFile(path.join(__dirname, "..", request.url), (err, file) => {
    console.log(file);
    if (err) {
      console.log(err);
      return;
    } else {
      response.end(file);
    }
  });
};

const queryHandler = (request, response) => {
//check what is coming through ("/search/input")
  console.log(request.url)
  let query = request.url.split('search/')[1];
  console.log(query)
  response.end()
// extract the query from the url

// get infomation form json

// return a new object, send to client

};

module.exports = { indexHandler, publicHandler, queryHandler };
