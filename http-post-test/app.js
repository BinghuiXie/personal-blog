const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // 数据格式
    // req.headers 获取所有的请求头
    console.log('req content-type: ', req.headers['content-type']);
    // 接受数据
    let postData = '';
    // 通过 on 绑定事件，当数据传过来的时候触发事件，类似与前端的 dom.on('click', () => {})
    req.on('data', chunk => {
      console.log('chunk.toString():  \n', chunk.toString());
      postData += chunk.toString()
    });
    // 当结束的时候触发事件
    req.on('end', () => {
      console.log(postData);
      res.end("Hello World"); // 在这里返回，因为是异步
    })
  }
});

server.listen(8000, () => {
  console.log('listening on 8000 port');
});