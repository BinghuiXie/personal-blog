const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  console.log(req.method); // GET
  let { url, query } = req;
  console.log('url: ', url);
  query = querystring.parse(url.split('?')[1]);
  console.log(query);
  res.end(JSON.stringify(query));
});

server.listen(8000, () => {
  console.log('8000 ok');
});