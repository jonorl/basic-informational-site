let http = require("http");
let url = require("url");
let fs = require("fs/promises");

http
  .createServer(async function (req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname === "/") {
      filename = "./index.html";
    } else {
      filename = "." + q.pathname + ".html";
    }

    try {
      const fileData = await fs.readFile(filename);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(fileData);
      return res.end();
    } catch (err) {
      const errorPage = await fs.readFile("./404.html");
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(errorPage);
      return res.end();
    }
  })
  .listen(8082);
