const fs = require("fs");
const path = require("path");


// 用 promise 获取文件内容
function getFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'file', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return ;
      }
      resolve(JSON.parse(data.toString())); // data 默认是二进制形式，转成字符串再转成对象的形式
    });
  })
}

// 只有两层，不会出现回调函数，每一个 .then 调的回调函数都返回一个 promise，所以可以接着 .then， 就是一个链式调用
getFileContent('a.json').then(aData => {
  console.log('a data: ', aData);
  return getFileContent(aData.next)
}).then(bData => {
  console.log('b data: ', bData);
  return getFileContent(bData.next)
}).then(cData => {
  console.log('c data: ', cData);
});