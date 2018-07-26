const handlers = require("./handlers");
const search = "/search?q=";

const routes = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handlers.indexHandler(request, response);
  } else if (url.includes("/public/")) {
    handlers.publicHandler(request, response);
  } else if (url.includes(search)) {
    // need to handle search query stuff
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("custom 404 goes here");
  }
};

module.exports = routes;
