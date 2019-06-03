const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // 设置返回格式为 JSON
  res.setHeader('Content-type', 'application/json');

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  };

  // 返回
  if (method === 'GET') {
    // 返回字符串
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      console.log('chunk: ', chunk);
      postData += chunk.toString();
    });
    req.on('end', () => {
      console.log('postData: ', postData);
      resData.postData = postData;
      console.log('JSON.stringify(resData): \n', JSON.stringify(resData));
      res.end(JSON.stringify(resData));
    })
  }
});

server.listen(8000, () => {
  console.log('listening at 8000 port');
});