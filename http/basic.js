const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello world");
    res.end();
  }
});
server.listen(3005);
console.log("listening on port 3005...");
