const { executeSQL } = require('../db/mysql');

class User {
  loginCheck (username, password) {
    // 先使用假数据
    const sql = `select username, realname from users where username='${username}' and password='${password}'`;
    return executeSQL(sql).then(rows => {
      // select 返回的是一个数组
      console.log('rows[0] is: ', rows[0]);
      return rows[0] || {}
    })
  }
}

module.exports = User;