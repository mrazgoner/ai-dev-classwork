const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const PORT = process.env.PORT || 5173;
const indexPath = path.join(__dirname, "index.html");

http.createServer((req, res) => {
  if (req.method !== "GET" || (req.url !== "/" && req.url !== "/index.html")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  fs.createReadStream(indexPath).pipe(res);
}).listen(PORT, () => {
  console.log(`Student grade frontend running at http://localhost:${PORT}`);
});
