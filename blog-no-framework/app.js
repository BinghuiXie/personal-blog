const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

const getPostData = req => {
  // 用于处理 postData
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      // GET 请求不存在 postData，返回一个空就行
      resolve({});
      return ;
    }
    // 返回数据不是 json 就暂时忽略
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return ;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        // 数据为空
        resolve({});
        return ;
      }
      // 最终成功
      resolve(JSON.parse(postData))
    })
  })
};

const serverHandle = (req, res) => {
  // 设置返回格式JSON
  // console.log(res);
  res.setHeader('Content-type', 'application/json');

  // 获取 path
  const { url } = req;
  // console.log('url: ', url);
  req.path = url.split('?')[0];

  // 解析 query
  req.query = querystring.parse(url.split('?')[1]);
  // console.log('req.query: ', req.query);

  // 处理 postData
  getPostData(req).then(postData => {
    // 拿到 postData 以后放到 body 里面
    req.body = postData;

    // 处理 blog 路由
    // handleBlogRouter 返回一个 promise
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        // console.log('blogData: \n', blogData);
        res.end(JSON.stringify(blogData));
      });
      return ;
    }
    // 处理 user 路由
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    //   return ;
    // }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData))
      });
      return ;
    }


    // 为不匹配路由返回 404
    res.writeHead(404, {"Content-type": "text/plain"}); // 纯文本
    res.write("404 Not Found\n");
    res.end()
  });

};

module.exports = serverHandle;

// process.env.NODE_ENV