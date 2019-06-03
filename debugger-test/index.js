const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  // 结束的时候返回一个 hello world
  res.end('<h1>hello world</h1>')
});

server.listen(3000, () => {
  console.log('listening on 3000 port');
});