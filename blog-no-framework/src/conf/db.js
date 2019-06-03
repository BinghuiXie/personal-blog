const env = process.env.NODE_ENV; // 环境参数 => package.json 开发模式还是线上模式

// 配置
let MYSQL_CONF;

// 不同的环境变量不同的配置
if (env === 'dev') {
  // 开发模式时使用本地数据库启动本地服务
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '1479085300xbh',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  // 线上环境时是用线上数据库，相应的配置要更改 => 先用假数据模拟
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '1479085300xbh',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
};