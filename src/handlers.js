const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const mime = require("mime-types");
const data = require("../data.json");

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
// console.log(request.url)
// extract the query from the url
// use regex and trim to only allow spaces, digits, letters and apostrophies to be included in the decoded string, user input
let query = decodeURIComponent(request.url.split('search/')[1]).replace(/[^A-Za-z0-9' ]/g, "")
.trim();

console.log(query);


// get information from json (alreday an object)
const autocomplete = filteredObject(searchJSON(query, data));
// return a new object, send to client
response.end(JSON.stringify(autocomplete))
};


function searchJSON(query, data) {
  // search the keys with fake variable and return an array with matching results
  const matchArray = Object.keys(data).filter(item => item.toLowerCase().includes(query.toLowerCase()));
  // return the array with matched results
  return matchArray;
}

function filteredObject(matches) {
  // start with empty object
  const newObj = {};
  // take the array of matched keys and set it value to what's the value in the json
  matches.forEach(item => newObj[item] = data[item])
  // return the filled new Object
  return newObj
}



module.exports = { indexHandler, publicHandler, queryHandler };
