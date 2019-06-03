const Controller = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const _con = new Controller;

const handleBlogRouter = (req, res) => {
  const { method } = req;
  const id = req.query.id;

  // 获取博客列表
  if (method === 'GET') {
    switch (req.path) {
      case '/api/blog/list':
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = _con.getList(author, keyword);
        // 返回一个 promise
        return result.then(listData => {
          return new SuccessModel(listData);
        });
      case '/api/blog/detail':
        const data = _con.getDetail(id);
        return data.then(result => {
          // result 是查询出来的数据
          return new SuccessModel(result)
        });
    }
  }
  if (method === 'POST') {
    switch (req.path) {
      case '/api/blog/new':
        // 假数据，开发登录时再修改
        const newAuthor = 'zhangsan';
        req.body.author = newAuthor;
        const blogData = req.body;
        const data = _con.newBlog(blogData);
        return data.then(result => {
          // result 就是插入的 id
          return new SuccessModel(result);
        });
      case '/api/blog/update':
        const result = _con.updateBlog(id, req.body);
        return result.then(val => {
          // val 是 true 或者 false
          if (val) {
            return new SuccessModel()
          }
          return new ErrorModel('更新博客失败')
        });
      case '/api/blog/del':
        const deleteAuthor = '不会拉小提琴的左脚';
        const isDeleteSuccess = _con.deleteBlog(id, deleteAuthor);
        return isDeleteSuccess.then(result => {
          if (result) {
            return new SuccessModel()
          }
          return new ErrorModel('删除博客失败')
        })
    }
  }
};

module.exports = handleBlogRouter;