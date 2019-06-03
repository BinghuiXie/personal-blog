const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;
  // http://localhost:8000/api/login?username=zhangsan&password=123456
  const path = url.split("?")[0]; // api/login
  const params = url.split("?")[1]; // username=zhangsan&password=123456
  res.end(params)
});

server.listen(8000, () => {
  console.log('listening on 8000');
});