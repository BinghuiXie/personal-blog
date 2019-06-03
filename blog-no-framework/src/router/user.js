const User = require('../controller/user');
const { SuccessModel, ErrorModel } = require("../model/resModel");

const user = new User;

const handleUserRouter = (req, res) => {
  const { method } = req;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = user.loginCheck(username, password);
    return result.then(data => {
      if (data.username) {
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    });
  }
};

module.exports = handleUserRouter;