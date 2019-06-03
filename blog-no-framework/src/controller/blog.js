const { executeSQL }  = require('../db/mysql');

class Controller {
  getList (author, keyword) {
    // 因为 author， keyword 不一定有值，所以加一个 where 1=1，这样可以避免在 author，keyword 都不存在的时候，sql 语句格式不正确
    let sql = `select * from blogs where 1=1 `;
    if (author) {
      sql += `and author='${author}' `;
    }
    if (keyword) {
      sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc;`;

    // 返回的是一个 promise
    return executeSQL(sql)
  };

  getDetail (id)  {
    const sql = `select * from blogs where id = ${id}`;
    // 查询到的数据是一个数组
    return executeSQL(sql).then(rows => {
      return rows[0]
    })
  };

  newBlog (blogData = {}) {
    // blogData 是一个博客对象，包含 title，content author 属性
    const {title, content, author} = blogData;
    const createtime = Date.now(); // 新建博客的时间
    const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createtime}, '${author}');`;
    return executeSQL(sql).then(insertData => {
      // console.log('insertData is : \n', insertData);
      return {
        // insertId 是新插入的哪一行的 id 值
        id: insertData.insertId
      }
    });
  }
  updateBlog (id, blogData = {}) {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title，content 属性
    const { title, content } = blogData;
    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
    return executeSQL(sql).then(updateData => {
      // console.log('updateData is: ', updateData);
      return updateData.affectedRows > 0 // 返回 true 还是 false
    })
  }

  deleteBlog (id, author) {
    // id 是要删除的博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}'`;
    return executeSQL(sql).then(deleteData => {
      console.log('deleteData is: ', deleteData);
      return deleteData.affectedRows > 0
    })
  }
}

module.exports = Controller;