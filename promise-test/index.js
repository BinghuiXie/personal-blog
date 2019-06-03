const fs = require("fs");
const path = require("path");

// callback 方式获取一个文件的内容
function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'file', fileName); // 找到 a.json 的绝对路径
  // 读取文件，异步操作
  fs.readFile(fullFileName, (err, data) => {
    // data 就是 a 文件中的内容
    if (err) {
      console.log(err);
      return ;
    }
    callback(JSON.parse(data.toString())); // data 默认是二进制形式，转成字符串再转成对象的形式
  });
}


// 回调地狱 => 多个文件的话就会一直嵌套下去
getFileContent('a.json', aData => {
  console.log('a data', aData);
  getFileContent(aData.next, bData => {
    console.log('b data', bData);
    getFileContent(bData.next, cData => {
      console.log('c data', cData);
    })
  })
});