const handlers = require("./handlers");
const search = "/search";

const routes = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handlers.indexHandler(request, response);
  } else if (url.includes("/public/")) {
    handlers.publicHandler(request, response);
  } else if (url.includes(search)) {
    handlers.queryHandler(request, response)
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("custom 404 goes here");
  }
};

module.exports = routes;
