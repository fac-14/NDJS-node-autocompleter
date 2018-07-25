const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes);
const port = process.env.PORT || 3000;

server.listen(port, () => {console.log(`Server up and running on ${port}`)});

