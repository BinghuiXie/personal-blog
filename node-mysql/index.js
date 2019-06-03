const mysql = require('mysql');

// 创建链接对象
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'myblog'
});

// 开始连接
connection.connect();

// 执行 sql 语句
const sql = `insert into blogs (title, content, createtime, author) values ('博客标题D', '博客内容D', 1559052009986, '不会拉小提琴的左脚')`;
connection.query(sql, (err, result) => {
  if (err) {
    console.log('error: ', err);
    return ;
  }
  console.log('result: ', result);
});

// 关闭连接
connection.end();
